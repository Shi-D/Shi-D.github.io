[TOC]

# Community Detection

## Louvain社区发现算法

### 基本信息

论文： Fast unfolding of communities in large networks

arXiv链接： [Paper](http://arxiv.org/abs/0803.0476)

Loucain是一种基于**模块度**的图算法模型，该算法速度很快，而且对一些**点多边少**的图，进行聚类效果特别明显。

### 模块度Modularity

$$
𝑄=\frac1{2𝑚}\sum_{𝑖,𝑗}[𝐴_{𝑖𝑗}−\frac{𝑘_𝑖𝑘_𝑗}{2𝑚}]𝛿(𝑐_𝑖,𝑐_𝑗)
$$

$𝐴_{𝑖𝑗}$是节点 i 和节点 j 之间边的权重。$𝑘_𝑖=\sum_𝑗𝐴_{𝑖𝑗}$表示与节点 i 相连的边的权重之和。$c_i$表示节点 i 所属的社区；$ m=\frac12\sum_{ij}A_{ij}$表示所有边的权重之和。$\delta$ 表示两个社区是否相同，$𝑐_𝑖 = 𝑐_𝑗$ 时，$\delta$ = 1。

公式中$𝐴_{𝑖𝑗}−\frac{𝑘_𝑖𝑘_𝑗}{2𝑚}=𝐴_{𝑖𝑗}−𝑘_𝑖\frac{𝑘_𝑗}{2𝑚}$，节点 j 连接到任意一个节点的概率是$\frac{𝑘_𝑗}{2𝑚}$，现在节点 i 有$𝑘_𝑖$的度数，因此在随机情况下节点 i 与 j 的边为 $k_i\frac{k_j}{2m}$

模块度的公式定义可以作如下简化：
$$
𝑄=\frac1{2𝑚}\sum_{𝑖,𝑗}[𝐴_{𝑖𝑗}−\frac{𝑘_𝑖𝑘_𝑗}{2𝑚}]𝛿(𝑐_𝑖,𝑐_𝑗)\\
=\frac1{2𝑚}[\sum_{𝑖,𝑗}𝐴_{𝑖𝑗}-\frac{\sum_𝑖𝑘_𝑖\sum_𝑗𝑘_𝑗}{2𝑚}]𝛿(𝑐_𝑖,𝑐_𝑗)\\
=\frac1{2𝑚}\sum_𝑐[\sum_{𝑖𝑛}−\frac{(\sum_{𝑡𝑜𝑡})^2}{2𝑚}]\\
=\sum_𝑐[\frac{\sum_{𝑖𝑛}}{2𝑚}−(\frac{\sum_{𝑡𝑜𝑡}}{2𝑚})^2]\\
=\sum_𝑐[𝑒_𝑐−𝑎_𝑐^2]
$$
其中$\sum_{𝑖𝑛}$表示社区 c 内的边的权重之和，$\sum_{tot}$表示与社区 c 内的节点相连的边的权重之和。

这样模块度就可以理解是**社区内部边的权重减去所有与社区内节点相连的边的权重和**，对无向图更好理解，即**社区内部边的度数减去社区内节点的总度数**。



### 模块度增益

$$
Δ𝑄=[\frac{\sum_{𝑖𝑛}+𝑘_{𝑖,𝑖𝑛}}{2𝑚}−(\frac{\sum_{𝑡𝑜𝑡}+𝑘_𝑖}{2𝑚})^2]−[\frac{\sum_{𝑖𝑛}}{2𝑚}−(\frac{\sum_{𝑡𝑜𝑡}}{2𝑚})^2−(\frac{𝑘_𝑖}{2𝑚})^2]
$$

前面部分表示把节点 i 加入到社区 c 后的模块度，后一部分是节点 i 作为一个独立社区和社区c的模块度，相减即为模块度增益。

化简后即为，
$$
Δ𝑄=[\frac{𝑘_{𝑖,𝑖𝑛}}{2𝑚}−\frac{\sum_{𝑡𝑜𝑡}𝑘_𝑖}{2𝑚^2}]
$$
$𝑘_{𝑖,𝑖𝑛}$是社区c内节点与节点 i 的边权重之和，注意对$𝑘_{𝑖,𝑖𝑛}$是对应边权重加起来再乘以2（因为你之后要除以2的）



### 算法思想

1、将图中的每个节点看成一个独立的社区，初始时社区的数目与节点个数相同；

2、对每个节点 i，依次尝试把节点i分配到其每个邻居节点所在的社区，计算分配前与分配后的模块度变化Δ𝑄，并记录Δ𝑄最大的那个邻居节点，如果𝑚𝑎𝑥Δ𝑄>0，则把节点 i 分配Δ𝑄最大的那个邻居节点所在的社区，否则保持不变；

3、重复步骤 2，直到所有节点的所属社区不再变化；（即收敛）

4、对图进行压缩，将所有在同一个社区的节点压缩成一个新节点，**社区内节点之间的边的权重转化为新节点的环的权重**，社区间的边权重转化为新节点间的边权重；

5、重复步骤1直到整个图的模块度不再发生变化。



### 实验

#### 实验一 纯手敲Louvain算法

参考：https://github.com/patapizza/pylouvain

数据集：arxiv

实验结果：

<img src="https://shiy-d.github.io/ImageHost/Figure_pylouvain.png" alt="img"  />

因为在真实数据集中节点量太大，因此我在16个节点的数据集中实验，可以看出Louvain算法社区检测结果还是可以的：

<img src="https://shiy-d.github.io/ImageHost/Figure_pylouvain2.png" alt="img"  />





#### 实验二 Networkx调包侠

数据集：arxiv

实验结果：

<img src="https://shiy-d.github.io/ImageHost/Figure_nxlouvain.png" alt="img"  />

> 学习参考：https://www.cnblogs.com/fengfenggirl/



## K-L算法（Kernighan-Lin）

### 算法思想

K-L（Kernighan-Lin）算法是一种将已知网络划分为已知大小的**两个社区的二分方法**，是一种贪婪算法。

它的主要思想是为网络划分定义了一个函数增益Q，根据这个方法找出使增益函数Q的值成为最大值的划分社区的方法。

具体策略是，将社区结构中的结点移动到其他的社区结构中或者交换不同社区结构中的结点。从初始解开始搜索，直到从当前的解出发找不到更优的候选解，然后停止。

### 算法缺陷

K-L算法的缺陷是必须先指定了两个子图的大小，不然不会得到正确的结果，实际应用意义不大。



## 谱二分算法

### 算法思想

当网络中存在两个社区结构时，就能够根据非零特征值所对应的特征向量中的元素值进行结点划分。把所有正元素对应的那些结点划分为同一个社区结构，而所有负元素对应的结点划分为另外一个社区结构。

谱二分算法利用的是**Laplace矩阵**的特征值和特征向量的性质来做社区划分。**Laplace矩阵**的第二小特征值λ2的值越小，划分的效果就越好。所以谱二分法使用Laplace矩阵的第二小特征值来划分社区。 

### 算法缺陷

**一次只能划分2个社区**，如果需要划分多个，需要执行多次。如果只需要划分两个社区，谱平分法的效率比较高，但是要划分多个社区的时候，谱二分法的效率就不高了，它的优点也不能得到充分的体现，而且准确度也可能会降低。



