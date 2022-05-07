# ARIMA

时间序列模型有：AR模型、MA模型、ARMA模型、ARIMA模型，前 3 个只适用于平稳时间序列的分析。

**AR**：自回归（Auto Regression）

**I**：单整阶数（Integration），时间序列必须是平稳的，才能建立计量模型。对时间序列进行单位根检验，**如果是非平稳序列，那么需要通过差分转化为平稳序列，经过几次差分转化为平稳序列，就称为几阶单整**；

**MA**：移动平均模型（Moving Average）

### 0 basic 

**ARIMA** 模型记作 **ARIMA(p，d，q)**，**p为自回归项数**，**q为滑动平均项数**，**d为使之成为平稳序列所做的差分次数（阶数）**。“差分”是关键步骤，<u>采用 ARIMA 模型预测的时序数据，必须是稳定的（平稳性），不稳定的数据，是无法捕捉到时序规律的。</u>

ARIMA 模型实际上是 AR 模型和 MA 模型的组合，ARIMA 模型与 ARMA 模型的区别：ARMA模型是针对平稳时间序列建立的模型，而ARIMA模型是针对非平稳时间序列建立的模型。换句话说，<u>非平稳时间序列要建立 ARMA 模型，首先需要经过差分转化为平稳时间序列，然后建立ARMA模型。</u>

- 模型的**优点**是：模型简单，只需要内生变量而不需要借助其他外生变量。
- 模型的**缺点**是：要求时序数据是稳定的，或者通过差分化之后是稳定的；**本质上只能捕捉线性关系，不能捕捉非线性关系**。

```python
from __future__ import print_function
import pandas as pd
import matplotlib.pyplot as plt
import statsmodels.api as sm
from statsmodels.tsa.arima_model import ARIMA
 
"""
ARIMA模型Python实现
ARIMA模型基本假设：
    1.数据平稳性
    2.白噪声同方差
    3.数据无周期性
参考文献：
    https://www.cnblogs.com/junge-mike/p/9335054.html
    https://support.minitab.com/zh-cn/minitab/18/help-and-how-to/modeling-statistics/time-series/how-to/partial-autocorrelation/interpret-the-results/partial-autocorrelation-function-pacf/
    https://support.minitab.com/zh-cn/minitab/18/help-and-how-to/modeling-statistics/time-series/how-to/autocorrelation/interpret-the-results/autocorrelation-function-acf/
"""
 
####1.载入数据
#载入为dataframe格式,data列为序列值，sdate列为日期
df = pd.read_csv(r"C:\Users\ld\Desktop\yc18\train1.csv",encoding="cp936")
dta=pd.Series(df["data"])
dta.index = pd.Index(df["sdate"])
 
 
####2.差分
#对原始数据进行差分,并绘制差分后的折线图观察平稳性
fig = plt.figure(figsize=(12,8))
ax2= fig.add_subplot(111)
diffs = dta.diff(3)
diffs.plot(ax=ax2)
diffs = diffs.dropna()
plt.show()
 
####3.ADF单位根检验
#观察差分图像判断数据平稳性的方式有一定主观性，因此进一步采用.ADF单位根检验；确定d值（差分阶数）
from statsmodels.tsa.stattools import adfuller
result = adfuller(diffs)
print(u'差分序列的ADF平稳性检验结果为：',result)
 
####4.自相关图和偏自相关图
#在差分满足数据平稳性要求后,通过绘制相关图和偏自相关图确定最优p,q值
#判断方法见：https://mp.csdn.net/mp_blog/creation/editor/122997522
fig = plt.figure(figsize=(12,8))
ax1=fig.add_subplot(211)
fig = sm.graphics.tsa.plot_acf(diffs,lags=30,ax=ax1)
ax2 = fig.add_subplot(212)
fig = sm.graphics.tsa.plot_pacf(diffs,lags=30,ax=ax2)
plt.show()
 
 
####5.对p,q进行定阶
#同样，通过偏/自相关图判断最优p,q值的方式有些主观,下面采样bic方式获取最优p,q值
pmax = int(len(diffs) / 10)    #一般阶数不超过 length /10
qmax = int(len(diffs) / 10)
bic = []
for i in range(pmax +1):
    item= []
    for j in range(qmax+1):
        try:
            item.append(int(ARIMA(diffs, (i, 1, j)).fit().bic))
        except:
            item.append(None)
        bic .append(item)
 
bic = pd.DataFrame(bic ) 
bic .fillna(bic .max(),inplace=True)
print("bic :",bic )
p,q = bic .stack().idxmin()
print('best p = %s , q = %s' %(i,j))  
 
 
####6.白噪声检验
#对白噪声的平稳性进行检验
from statsmodels.stats.diagnostic import acorr_ljungbox
print(u'白噪声检验：', acorr_ljungbox( diffs, lags=1))
 
 
####7.周期性检验
#对数据的趋势性周期性进行检验
import statsmodels.api as sm
dfs = pd.read_csv(r"C:\Users\ld\Desktop\yc18\train1.csv",encoding="cp936")[["sdate","data"]]
dfs['sdate'] = pd.to_datetime(dfs['sdate'])
dfs = dfs.set_index(["sdate"])
#data指你自己的时序数据，model='additive'代表是加法模式，multiplicative乘法模型
#extrapolate_trend='freq'表示trend 、resid频率会从最近点开始，并且会对最近点的缺失值进行填充
#更多参数设置请参考官方文档：https://www.statsmodels.org/stable/generated/statsmodels.tsa.seasonal.seasonal_decompose.html
decomposition = sm.tsa.seasonal_decompose(dfs, model='additive', extrapolate_trend='freq')
plt.rc('figure',figsize=(12,8))
fig = decomposition.plot()
plt.show()
 
####8.拟合ARIMA模型
#在确保三个基本假设都满足后，即可开始建模，其中ARIMA的三个参数（p,d,q）选用步骤3和5的最优结果
model = ARIMA(diffs, (p,0,q)).fit()
model.summary2()
 
####9.预测
#forecast（）中填入预测期数，开始预测
pre = model.forecast(1)[0]
print("pre:",pre)
```

