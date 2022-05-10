# 决策树

## 一、决策树

https://www.bilibili.com/video/BV1Ps411V7px?p=3&spm_id_from=pageDriver

关键词：决系统、信息熵、信息增溢

ID3：信息增益（容易过拟合），信息熵 $= - \sum_i P_ilog(P_i)$

C4.5：信息增益率，$gain_{ratio}(A)=\frac{gain(A)}{split_info(A)}$，自身熵/属性分裂的熵

CART：GINI 系数

#### 1 属性

**属性类型**

- 属性是离散值且不要求生成二叉决策树。此时用属性的每一个划分作为一个分支。
- 属性是离散值且要求生成二叉决策树。此时使用属性划分的一个子集进行测试，按照“属于此子集”和“不属于此子集”分成两个分支。
- 属性是连续值。此时确定一个值作为分裂点split_point，按照>split_point和<=split_point生成两个分支。

**连续值如何划分分界点**

- 选定候选划分点
- 计算各候选划分点的信息增益
- 选择信息增益的来作为划分点

#### 2 停止条件

决策树的构建过程是一个递归的过程，所以需要确定停止条件，否则过程将不会结束。一种最直观的方式是**当每个子节点只有一种类型的记录时停止，但是这样往往会使得树的节点过多，导致过拟合问题（Overfitting）**。另一种可行的方法是**当前节点中的记录数低于一个最小的阀值，那么就停止分割，将max(P(i))对应的分类作为当前叶节点的分类**。

#### 3 过度拟合

采用上面算法生成的决策树在事件中往往会导致过度拟合。也就是该决策树对训练数据可以得到很低的错误率，但是运用到测试数据上却得到非常高的错误率。过渡拟合的原因有以下几点：

- 噪音数据：训练数据中存在噪音数据，决策树的某些节点有噪音数据作为分割标准，导致决策树无法代表真实数据。
- 缺少代表性数据：训练数据没有包含所有具有代表性的数据，导致某一类数据无法很好的匹配，这一点可以通过观察混淆矩阵（Confusion Matrix）分析得出。
- 多重比较（Mulitple Comparision）：举个列子，股票分析师预测股票涨或跌。假设分析师都是靠随机猜测，也就是他们正确的概率是0.5。每一个人预测10次，那么预测正确的次数在8次或8次以上的概率为 5% 左右，比较低。但是如果50个分析师，每个人预测10次，选择至少一个人得到 8 次或以上的人作为代表，那么概率为 94%，概率十分大，随着分析师人数的增加，概率无限接近1。但是，选出来的分析师其实是打酱油的，他对未来的预测不能做任何保证。上面这个例子就是多重比较。这一情况和决策树选取分割点类似，需要在每个变量的每一个值中选取一个作为分割的代表，所以选出一个噪音分割标准的概率是很大的。

#### 4 修剪枝叶

决策树过渡拟合往往是因为太过“茂盛”，也就是节点过多，所以需要裁剪（Prune Tree）枝叶。裁剪枝叶的策略对决策树正确率的影响很大。主要有两种裁剪策略。

- **前置裁剪**。在构建决策树的过程时，提前停止。那么，会将切分节点的条件设置的很苛刻，导致决策树很短小。结果就是决策树无法达到最优。实践证明这中策略无法得到较好的结果。
- **后置裁剪**。决策树构建好后，然后才开始裁剪。采用两种方法：
  - 1）用单一叶节点代替整个子树，叶节点的分类采用子树中最主要的分类；
  - 2）将一颗子树完全替代另外一颗子树。后置裁剪有个问题就是计算效率，有些节点计算后就被裁剪了，导致有点浪费。

## 二、随机森林 Random Forest

Random Forest 是用训练数据随机的计算出许多决策树，形成了一个森林。然后用这个森林对未知数据进行预测，选取投票最多的分类。实践证明，此算法的错误率得到了经一步的降低。这种方法背后的原理可以用 “三个臭皮匠定一个诸葛亮”这句谚语来概括。一颗树预测正确的概率可能不高，但是集体预测正确的概率却很高。RF 是非常常用的分类算法，效果一般都很好。

由于单棵随机树容易过拟合的现象，我们可以将多棵树组合在一个称之为随机森林（random forest）。

- 构建树时对训练集进行随机抽样。
- 分割结点的时候考虑特征的随机子集。

**随机抽样训练观测数据**

在构建每棵树的时候，随机从训练数据中有放回地抽样等量数据用来训练每棵树，这个过程叫做**bootstraping**，这就意味着每棵树在训练的时候都可能用到相同一部分样本，背后的思想其实是在减少bias的情况下，每棵树相对于整个训练集上有比较大的方差，但是整个森林的结果会具有比较低的方差。

**用于拆分结点的特征随机子集**

随机森林的另外一个思想就是随机选取特征集合的一个子集进行子结点的划分。比如数据的特征有16个，初始设置的特征采样是 ![[公式]](https://www.zhihu.com/equation?tex=%5Csqrt%7Bn%5C_features%7D) ，那么每次划分子结点的时候，只考虑其中随机的4个特征。

## 三、提升算法 Adaboost

**Adaboost** 是由多个弱分类器组成一个强分类器，通过前向贪心算法最小化损失函数得到，<u>每一次迭代都在改变训练样本的权重分布减少训练误差，分类器的误差率越小，权重越大</u>，且<u>上一轮分错的样本在下一轮中会获得更大的权重</u>。具体的步骤如下：

1. 初始化训练样本的权重 ![[公式]](https://www.zhihu.com/equation?tex=W_1+%3D+%28w_%7B11%7D%2Cw_%7B12%7D%2C%5Cdots%2Cw_%7B1n%7D%29+%3D+%28%5Cfrac%7B1%7D%7Bn%7D%2C%5Cfrac%7B1%7D%7Bn%7D%2C%5Cdots%2C%5Cfrac%7B1%7D%7Bn%7D%29%5C%5C)

2. 根据初始化权重的训练样本学习一个基分类器 ![[公式]](https://www.zhihu.com/equation?tex=G_1) （二分类为例）： ![[公式]](https://www.zhihu.com/equation?tex=%5Cchi++-%3E%5C%7B-1%2C1%5C%7D)

3. 计算基分类器 ![[公式]](https://www.zhihu.com/equation?tex=G_1) 的误差率 ![[公式]](https://www.zhihu.com/equation?tex=e_1) : ![[公式]](https://www.zhihu.com/equation?tex=e_1+%3D+%5Csum_%7Bi%3D1%7D%5E%7Bn%7Dw_%7B1i%7DI%28%5C%7BG_1%28x_i%5Cne+y_i%5C%7D%29%5C%5C) 

   并更新基分类器 ![[公式]](https://www.zhihu.com/equation?tex=G_1) 的权重 ![[公式]](https://www.zhihu.com/equation?tex=a_1+%3D+%5Cfrac%7B1%7D%7B2%7D%5Clog%5Cfrac%7B1-e_1%7D%7Be_1%7D) 

4. 更新训练样本的权重 ![[公式]](https://www.zhihu.com/equation?tex=W_2) ， ![[公式]](https://www.zhihu.com/equation?tex=w_%7B2i%7D+%3D+%5Cfrac%7Bw_%7B1i%7Dexp%28-a_1y_iG_i%28x_i%29%29%7D%7B%5Csum_%7Bi%3D1%7D%5E%7Bn%7Dw_%7B1i%7Dexp%28-a_1y_iG%28x_i%29%29%7D%5C%5C)

5. 按照上述方法迭代产生 ![[公式]](https://www.zhihu.com/equation?tex=M) 个基分类器 ![[公式]](https://www.zhihu.com/equation?tex=G_1%2CG_2%2C%5Cdots%2CG_M) 。

6. 最终的分类器定义为 ![[公式]](https://www.zhihu.com/equation?tex=G%28x%29+%3D+sign%28f%28x%29%29+%3D+sign%28%5Csum_%7Bi%3D1%7D%5E%7BM%7Da_iG_i%28x%29%29%5C%5C)

7. 损失函数为： ![[公式]](https://www.zhihu.com/equation?tex=L%28y%2Cf%28x%29%29+%3D+exp%28-yf%28x%29%29)

## 四、梯度提升回归树 GBDT

**GBDT(Gradient Boosting Decision Trees)**是以**CART**回归树为基函数的**boosting**集成算法，第j轮是对前j-1棵树的残差进行拟合，新一轮的强分类器等于前一轮强分类器加上新的弱分类器。

假设 ![[公式]](https://www.zhihu.com/equation?tex=D%3D%5C%7B%28x_i%2Cy_i%29%5C%7D_%7Bi%3D1%7D%5E%7Bn%7D) 以及对应的损失函数为 ![[公式]](https://www.zhihu.com/equation?tex=L)

首先选择一个CART决策树使得 ![[公式]](https://www.zhihu.com/equation?tex=%5Cbegin%7Baligned%7D+F_0+%3Dargmin_%7B%5Cgamma%7D%5Csum_%7Bi%3D1%7D%5E%7Bn%7DL%28y_i%2C%5Cgamma%29+%5Cend%7Baligned%7D)

for ![[公式]](https://www.zhihu.com/equation?tex=m%3A%3D1%5Cleftarrow+M) do:

1. 计算负梯度 w.r.t ![[公式]](https://www.zhihu.com/equation?tex=F_%7Bm-1%7D%28x_i%29) :

![[公式]](https://www.zhihu.com/equation?tex=r_%7Bim%7D+%3D+-%5Cleft+%5B%5Cfrac%7B%5Cpartial+L%28y_i%2C+F_%7Bm-1%7D%28x_i%29%29%7D%7B%5Cpartial+F_%7Bm-1%7D%28x_i%29%7D%5Cright%5D%2C+i%3D1%2C%5Cdots%2Cn%5C%5C)

2. 利用CART决策树 ![[公式]](https://www.zhihu.com/equation?tex=h_m%28x%29) 来拟合 ![[公式]](https://www.zhihu.com/equation?tex=%5C%7B%28x_i%2C+r_%7Bim%7D%29%5C%7D_%7Bi%3D1%7D%5En) .

3. 利用 linear search 的方法计算 multiplier ![[公式]](https://www.zhihu.com/equation?tex=%5Crho) :

![[公式]](https://www.zhihu.com/equation?tex=%5Crho_m+%3D+argmin_%7B%5Crho%7D%5Csum_%7Bi%3D1%7D%5E%7Bn%7DL%28y_i%2C+F_%7Bm-1%7D%28x_i%29%2B%5Crho%5Ccdot+h_m%28x_i%29%29%5C%5C)

4. 更新模型为：

![[公式]](https://www.zhihu.com/equation?tex=F_m+%3D+F_%7Bm-1%7D+%2B+%5Crho_m+h_m%5C%5C)

end

return ![[公式]](https://www.zhihu.com/equation?tex=F_M)

GBDT在每一次迭代中，算法使用前一时刻的模型 ![[公式]](https://www.zhihu.com/equation?tex=F_%7Bm-1%7D) 与标签 ![[公式]](https://www.zhihu.com/equation?tex=y_i)之间的负梯度 ![[公式]](https://www.zhihu.com/equation?tex=%5Chat%7BD%7D_m+%3D++%5Cleft%5C%7B%28x_i%2C+r_%7Bim%7D%29%5Cright%5C%7D_%7Bi%3D1%7D%5E%7Bn%7D) 对CART决策树弱学习器 ![[公式]](https://www.zhihu.com/equation?tex=h_m) 进行训练，从而得到更强的强学习器 ![[公式]](https://www.zhihu.com/equation?tex=F_m+%3D+F_%7Bm-1%7D+%2B+h_m)

## 五、XGboost

![[公式]](https://www.zhihu.com/equation?tex=I_j) GBDT是通过一阶负梯度进行梯度下降，XGBoost这是对二阶导数的信息来指导弱学习器 ![[公式]](https://www.zhihu.com/equation?tex=h_m) 的训练，这样有助于提升训练的收敛速度，同时增加了正则项来惩罚树的数量和决策。树的权重：

首先将损失函数二阶展开，有：

![[公式]](https://www.zhihu.com/equation?tex=%5Csum_%7Bi%3D1%7D%5En+L%28y_i%2CF_%7Bm-1%7D%28x_i%29%2Bh_m%28x_i%29%29+%5Capprox%5Csum_%7Bi%3D1%7D%5En%5Cleft%5BL%28y_i%2C+F_%7Bm-1%7D%28x_i%29%2Bg_i%5Ccdot+h_m%28x_i%29+%2B+%5Cfrac%7B1%7D%7B2%7D%5Ccdot+h_i%5Ccdot+h_m%28x_i%29%5E2%5Cright%5D)

![[公式]](https://www.zhihu.com/equation?tex=g_i+%3D+%5Cfrac%7B%5Cpartial+L%28y_i%2C+F_%7Bm-1%7D%28x_i%29%29%7D%7B%5Cpartial+F_%7Bm-1%7D%28x_i%29%7D%2C+h_i+%3D+%5Cfrac%7B%5Cpartial%5E2L%28y_I%2C+F_%7Bm-1%7D%28x_i%29%29%7D%7B%5Cpartial+F_%7Bm-1%7D%28x_i%29%5E2%7D%5C%5C)

对于 ![[公式]](https://www.zhihu.com/equation?tex=i%3D1%2C%5Cdots%2Cn%2C+) 我们可以令

![[公式]](https://www.zhihu.com/equation?tex=%5Cfrac%7B%5Cpartial+L%28y_i%2C+F_%7Bm-1%7D%28x_i%29+%2B+h_m%28x_i%29%29%7D%7B%5Cpartial+h_m%28x_i%29%7D%5Capprox+g_i+%2B+h_i%5Ccdot+h_m%28x_i%29%29+%3D+0%5C%5C+h_m%28x_i%29+%3D+-%5Cfrac%7Bg_i%7D%7Bh_i%7D)

上式可以保证每一步损失函数在二阶近似上取得极小值。另外我们可以将 ![[公式]](https://www.zhihu.com/equation?tex=h_m) 表示成 ![[公式]](https://www.zhihu.com/equation?tex=h_m%28x%29+%3D+w_%7Bq%28x%29%7D%2Cq%3AR%5Ed%5Crightarrow+T%2Cw%5Cin+R%5ET%2C) 其中, ![[公式]](https://www.zhihu.com/equation?tex=q%28x%29) 表示将d维的特征映射到对应的某个叶子上 ![[公式]](https://www.zhihu.com/equation?tex=j) , ![[公式]](https://www.zhihu.com/equation?tex=j%5Cin+T) 上，即 ![[公式]](https://www.zhihu.com/equation?tex=j%5Cleftarrow+q%28x_i%29) ，从而有 ![[公式]](https://www.zhihu.com/equation?tex=h_m%28x_i%29+%3D+w_j) 。我们令 ![[公式]](https://www.zhihu.com/equation?tex=I+%3D+%5C%7BI%7Cq%28x_i%29%3Dj%5C%7D) 为落在叶子 ![[公式]](https://www.zhihu.com/equation?tex=j) , ![[公式]](https://www.zhihu.com/equation?tex=j%5Cin+T) 上的样本的集合，则 ![[公式]](https://www.zhihu.com/equation?tex=I_j) 中的样本都被预测为 ![[公式]](https://www.zhihu.com/equation?tex=h_m%28x_i%29+%3D+w_j) , 有

损失函数可以写成：

![[公式]](https://www.zhihu.com/equation?tex=%5Cbegin%7Baligned%7D+%5Csum_%7Bi%3D1%7D%5En+L%28y_i%2CF_%7Bm-1%7D%28x_i%29%2Bh_m%28x_i%29%29%26%5Capprox+%5Csum_%7Bi%3D1%7D%5En%5Cleft%5B+g_i%5Ccdot+h_m%28x_i%29+%2B+%5Cfrac%7B1%7D%7B2%7D%5Ccdot+h_i%5Ccdot+h_m%28x_i%29%5E2+%5Cright%5D+%2B+%5Cgamma+T+%2B+%5Cfrac%7B1%7D%7B2%7D%5Clambda+%5C%7Cw%5C%7C%5E2%5C%5C+%26%5Capprox+%5Csum_%7Bj%3D1%7D%5ET%5Cleft%5B+%28%5Csum_%7Bi%5Cin+I_%7Bj%7D%7Dg_j%29w_j%2B%5Cfrac%7B1%7D%7B2%7D%28%5Csum_%7Bi%5Cin+I_j+%7Dh_i+%2B+%5Clambda%29w_j%5E2++%5Cright%5D%2B+%5Cgamma+T+%5Cend%7Baligned%7D+)

**XGB的差别和优势**

1. XGB优化代价函数时，利用了一阶和二阶梯度，提高了精度，同时可以自定义损失函数。
2. 增加了正则项，可以控制模型的复杂度，包含叶子结点的数目和叶结点的权重。
3. 可以支持列抽样，在迭代过程中抽取部分数据进行学习。
4. 稀疏感知，可以忽略缺失值，或者将缺失指定分类结点，提高计算速度。
5. 对于新加入模型的决策树乘以一个学习率，学习率越小，需要的树越多。
6. 可支持线性分类器，灵活性强。
7. 利用块结构进行并行计算。















> 参考：
>
> - https://zhuanlan.zhihu.com/p/262904635
>
> - [Linghan Zhang：Gradient Boosting梯度提升-GBDT与XGBoost解析及应用](https://zhuanlan.zhihu.com/p/59563071)

