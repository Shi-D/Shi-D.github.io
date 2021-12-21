



[TOC]



# Python的一些小tricks

## numpy数据处理

列表对应相加

```
a = [1,2,3]
b = [1,1,1]

np.sum([active_time, is_active], axis=0).tolist()

[i+j for i,j in zip(a,b)]
```



#### np.c、np.r_

`np.c_`是按行连接两个矩阵，就是把两矩阵左右相加，要求行数相等。

```python
a = np.array([[1, 2, 3],[7,8,9]])
b=np.array([[4,5,6],[1,2,3]])
c=np.c_[a,b]

c
Out[2]: 
array([[1, 2, 3, 4, 5, 6],
       [7, 8, 9, 1, 2, 3]])
```



`np.r_`是把两矩阵上下相加，要求列数相等。

```python
a = np.array([[1, 2, 3],[7,8,9]])
b=np.array([[4,5,6],[1,2,3]])
 
d= np.array([7,8,9])
e=np.array([1, 2, 3])
 
g=np.r_[a,b]
 
g
Out[14]: 
array([[1, 2, 3],
       [7, 8, 9],
       [4, 5, 6],
       [1, 2, 3]])
 
h=np.r_[d,e]
 
h
Out[16]: array([7, 8, 9, 1, 2, 3])
```



#### ravel()、flatten()、squeeze()、reshape()

将多维数组转换为一维数组

```python
arr = np.range(12).reshape(4,3)

arr
Out[17]:
array([[1, 2, 3],
       [4, 5, 6],
       [7, 8, 9],
       [10, 11, 12]])
```

```python
a = arr.ravel()

a
Out[18]:
arr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
```

```python
b = arr.flatten()

b
Out[19]:
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
```

```python
c = arr.reshape(-1)

c
Out[20]:
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
```

```python
d = arr.squeeze()

d
Out[21]:
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
```



#### zip()

打包

```python
for input, label in zip(inputs, labels):
    pass
```

```python
a = [[1,2], [2,3], [3,4]]
b = [7,8,9]
c = zip(a, b)
print(c)

for i, j in c:
    print(i, j)
    
<zip object at 0x1082f1cc8>
[1, 2] 7
[2, 3] 8
[3, 4] 9
```

列表变字典

```python
ItemId = [54, 65, 76]
names = ["Hard Disk", "Laptop", "RAM"]
itemDictionary = dict(zip(ItemId, names))
print(itemDictionary)

# 输出：{54: 'Hard Disk', 65: 'Laptop', 76: 'RAM'}
```

#### Counter计数

对列表内的元素进行统计，得到元组列表

most_common()将数量从大到小排

```
Counter(flat_map).most_common()[0][0]
```



## Random

#### uniform

numpy.random.uniform(low,high,size)

从一个均匀分布[low,high)中随机采样，注意定义域是左闭右开，即包含low，不包含high。

若不填写参数，则为随机生成0-1内的小数。

#### randint

numpy.random.randint(low, high=None, size=None, dtype='l')，产生随机整数；

#### random_integers

原型： numpy.random.random_integers(low, high=None, size=None)，在闭区间上产生随机整数；

#### random_sample

原型： numpy.random.random_sample(size=None)，在[0.0,1.0)上随机采样；

#### random

原型： numpy.random.random(size=None)，和random_sample一样，是random_sample的别名；

#### rand

原型： numpy.random.rand(d0, d1, ..., dn)，产生d0 - d1 - ... - dn形状的在[0,1)上均匀分布的float型数。

#### randn

原型：numpy.random.randn（d0,d1,...,dn)，产生d0 - d1 - ... - dn形状的标准正态分布的float型数。



## matplotlib绘图

#### cmap取值

```python
cmaps['Perceptually Uniform Sequential'] = [
            'viridis', 'plasma', 'inferno', 'magma', 'cividis']

cmaps['Sequential'] = [
            'Greys', 'Purples', 'Blues', 'Greens', 'Oranges', 'Reds',
            'YlOrBr', 'YlOrRd', 'OrRd', 'PuRd', 'RdPu', 'BuPu',
            'GnBu', 'PuBu', 'YlGnBu', 'PuBuGn', 'BuGn', 'YlGn']
```

参考matploylib文档：https://matplotlib.org/tutorials/colors/colormaps.html?highlight=rdylgn



#### 用雷达图绘制二维坐标分类问题

```python
x_min, x_max = -5, 5
y_min, y_max = -5, 5
#h越小，精确度越高
h = 0.01
# 先搞定网格，横纵坐标
xx, yy = np.meshgrid(np.arange(x_min, x_max, h), np.arange(y_min, y_max, h))
# 将横纵坐标拼接起来，即为x_test
x_test = np.c_[xx.ravel(), yy.ravel()].T
print(x_test.T)
#将（-5，5）范围内的点放入模型进行预测
Z = predict(torch.Tensor(x_test.T))
print(Z.shape)
Z = Z.reshape(xx.shape)
print(Z.shape)
# 绘制雷达图，cmap取值见上面的知识点
plt.contourf(xx, yy, Z, cmap='RdYlGn')
#绘制散点图做比对
plt.scatter(x_train[:, 0], x_train[:, 1], c=y_train.squeeze(), cmap='RdYlGn')
```

#### 个人喜欢的色系RGB

```python
color = ['#C25E6E', '#B4E3DA', '#ECAD7C', '#5AAA9A', '#7779A8', '#A0BBCB', '#E6BEC5']
```



## Pandas数据处理

#### 读csv文件

```
G = pd.read_csv('../data/facebook')
```

#### 读取某一列

```
G['source']
```

#### loc()函数

```
g = G.copy().loc[np.random.uniform(0, 1, G.shape[0]) < p]  # 获取子图

temp = g.loc[g['target'].isin(new_nodes)]  #获取target那一列的value在new_nodes中的节点
```



## Basic用法

#### sorted

> 1、默认升序
>
> 2、不改变原来的序列
>
> 3、用参数key实现自定义排序

举例：

```python
numbers = [2, 5, 4, 1]
new = sorted(numbers)

>>>[1, 2, 4, 5]
```

```python
numbers = [2, 5, 4, 1]
new = sorted(numbers, reverse = True)

>>>[5, 4, 2, 1]
```

```python
str = ['s', 'ying', 'dan']
new = sorted(str, key = len)  # 根据字符串长度进行排序

>>>['s', 'dan', 'ying']
```

```python
name = ['amy', 'Bob', 'Rose', 'Amy', 'rose', 'bob']
new = sorted(name)
new2 = sorted(name, key=str.lower)
print(name)
print(new)
print(new2)

>>>['amy', 'Bob', 'Rose', 'Amy', 'rose', 'bob']
>>>['Amy', 'Bob', 'Rose', 'amy', 'bob', 'rose']
>>>['amy', 'Amy', 'Bob', 'bob', 'Rose', 'rose']
```



#### sort

> 1、sort是list类的一个方法，只能与list一起使用。它不是一个内置的迭代器。
>
> 2、sort()返回None并改变值的位置。



#### 字典

setdefault()

如果键不存在于字典中，将会添加键并将值设为默认值。

```python
dict.setdefault(key, default=None)
```

#### 找出两个列表中不同的元素

```python
list1 = ['Scott', 'Eric', 'Kelly', 'Emma', 'Smith']
list2 = ['Scott', 'Eric', 'Kelly']

set1 = set(list1)
set2 = set(list2)

list3 = list(set1.symmetric_difference(set2))
print(list3)

# 输出：['Emma', 'Smith']
```

#### 返回列表中出现次数最多的元素

```python
test = [1, 2, 3, 5, 2, 2, 3, 1, 2, 6, 2] 
print(max(set(test), key = test.count)) 

# 输出：2
```

#### 计算两个日期的间隔

```python
from datetime import date
d1 = date(2020,1,1) 
d2 = date(2020,9,13) 
print(abs(d2-d1).days)

# 输出：256
```



## 正则替换

**re.sub的参数：**有五个参数

re.sub(pattern, repl, string, count=0, flags=0)

其中三个必选参数：pattern, repl, string

两个可选参数：count, flags

**第一个：pattern**

pattern，表示正则中的模式字符串。

反斜杠加数字（\N），则对应着匹配的组（matched group） 

比如\6，表示匹配前面pattern中的第6个group 

**第二个参数：repl**

repl，就是replacement，被替换，的字符串的意思。

repl可以是字符串，也可以是函数。

repl是字符串

如果repl是字符串的话，其中的任何反斜杠转义字符，都会被处理的。

即：

\n：会被处理为对应的换行符； 

\r：会被处理为回车符； 

其他不能识别的转移字符，则只是被识别为普通的字符： 

比如\j，会被处理为j这个字母本身； 

反斜杠加g以及中括号内一个名字，即：\g，对应着命了名的组，named group

**第三个参数：string**

**string，即表示要被处理，要被替换的那个string字符串。**

第四个参数：count

举例说明：

继续之前的例子，假如对于匹配到的内容，只处理其中一部分。

比如对于：

hello 123 world 456 nihao 789

只是像要处理前面两个数字：123,456，分别给他们加111，而不处理789，

那么就可以写成：

replacedStr = re.sub("(?P\d+)", _add111, inputStr, 2);



## argparse

```python
def parse_args():
    parser = argparse.ArgumentParser(description=helper.description)
    parser.add_argument("-n", "--nodes", help=helper.nodes, default='123')
    parser.add_argument("-e", "--edges", help=helper.edges, default=(1,2))
    parser.add_argument("-f", "--filename", help=helper.filename, default=None)

    args = parser.parse_args()
    return args

  
args = parse_args()

print(args.nodes)
```



## 创建一个文件

```python
import os  

MESSAGE = '该文件已经存在.'
TESTDIR = 'testdir'
try:
    home = os.path.expanduser("~")  
    print(home)  

    if not os.path.exists(os.path.join(home, TESTDIR)):  
        os.makedirs(os.path.join(home, TESTDIR))  
    else:
        print(MESSAGE)
except Exception as e:
    print(e)
```

## 打印进度条

```python
import time 
import sys 

for progress in range(100):
    sys.stdout.write("\r[%s%s%d%%]" % ("="*progress, " "*(100-progress), progress))
    sys.stdout.flush()
    time.sleep(0.1)
```

还有一种方法

用tqmd

## 其他

代码开头

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-
```

DL常用package

```python
import torch
import torch.nn as nn
from torch.utils.data import dataset, DataLoader
from torchvision import datasets, transforms
import torch.optim as optim
import matplotlib.pyplot as plt
import numpy as np
import torch.nn.functional as F
```

