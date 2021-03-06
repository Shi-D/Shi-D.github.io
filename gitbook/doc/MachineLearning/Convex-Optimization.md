# 凸优化



### 一般形式

$$
minimize f_0(x)
$$

使得 $fi(x)≤bi$,  $i=1,⋯,m$

第一个为优化的目标，即最小化目标函数f(x)，而带大于号或小于号的，则是约束条件。我们希望找到一个满足约束条件的 x∗,使得对于任意的 z 满足约束条件：
$$
f_1(z)≤b_1,⋯,f_m(z)≤b_m
$$
有
$$
f_0(z)≥f_0(x∗)
$$
而 x∗就是我们所求的最后结果。

> 相当于你要从上海去北京，你可以选择搭飞机，或者火车，动车，但只给你500块钱，要求你以最快的时间到达，其中到达的时间就是优化的目标，500块钱是限制条件，选择动车，火车，或者什么火车都是x。

满足所有约束条件的点集称为可行域，记为X，又可以写为：
$$
min f(x) \quad s.t \; x∈X
$$


### 凸优化问题

在优化问题中，应用最广泛的是凸优化问题：

- 若可行域X是一个凸集：

  即对于任给的$x,y∈X$，

  总有$λx+(1−λ) \quad y∈X$，对于任意的 $λ∈(0,1)$

- 并且目标函数是一个凸函数：

  $f(λx+(1−λ)y))≤λf(x)+(1−λ)$

我们称这样的优化问题为凸优化问题

用图像来表示就是：
![这里写图片描述](https://img-blog.csdn.net/20171212204359383?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzk0MjI2NDI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
函数上方的点集就是凸集，函数上任意两点的连线，仍然在函数图像上方。

一句话说清楚就是：**希望找到合适的xx，使得f0(x)f0(x)最小。**



### 全局最优化与局部最优化

全局最优化指的是在满足条件约束的情况下，找到唯一的一个点满足最大值或者最小值。

局部最优化指的是在满足条件约束的情况下，有可能找到一个局部最大/小点，但不是全局最大或者最小的点。

最优化的过程，相当于爬山，希望找到一个点列$x_k$使得他的函数值是一直减少的，直到到达某一停止条件或者达到最小值的点$x_k$.

用数学上的术语可以表示为：

- 设xk为第k次迭代点，dk为第k次搜索方向，$α_k$为第k次迭代的步长因子，则第k次迭代为：
  $$
  x_{k+1}=x_k+α_kd_k
  $$
  从这里可以看到不同的步长和不同的搜索方向组成了不同的优化方法，这就是最优化理论中所讨论的。f是$x_k$的函数，搜索方向dk是f在$x_kd_k$是f在xk处的下降方向，即dk满足：

$$
∇f(x_k)^Tdk<0
$$

或者
$$
f(x_{k+1})=f(x_k+α_kd_k)<f(x_k)
$$
而最优化的基本可以表示为：给定初始点xk

1. 确定搜索方向$d_k$，即按照一定规则画方法确定f在$x_k$处的下降方向

2. 确定步长因子$α_k$，使得目标函数有一定的下降

3. 令
   $$
   x_{k+1}=x_k+α_kd_k
   $$
   不断迭代，直到$x_{k+1}$满足某种某种停止条件，即得到最优解

   $x_{k+1}$

最优化中的问题中，大部分都是在寻找各种各样的方法确定步长和方向，使得迭代的速度尽可能快，得到的解尽可能是最优的解。

## 最小二乘

最小二乘问题是无约束的优化问题，通常可以理解为测量值与真实值之间的误差平方和：
$$
minimize \, f_0(x)=∥Ax−b∥_2^2\,=∑_{i=1}^k(a^T_ix−b_i)^2
$$
这个问题既然没有约束条件，那应该怎么求解呢？我们的目标是求解出最好的x，观察这个式子可以发现，这个式子一定是大于等于0的，所以这样的最优化问题，我们可以把它转成线性方程来求解：
$$
A^TAx=A^Tb
$$
$A^T$为A的转置，因此根据矩阵的逆可得：
$$
x=(A^TA)^{−1}A^Tb
$$
**加权的最小二乘问题**：
$$
∑_{i=1}^kw_i(a^T_ix−b_i)^2
$$
权值均为正数，代表每一个 $a^T_ix−b_i$对结果的影响程度。

**正则化的最小二乘问题：**
$$
∑_{i=1}^k(a^T_ix−b_i)^2+ρ∑_{i=1}^nx^2_i
$$
ρρ是人为的选择的，用来权衡最小化$∑^k_{i=1}(a^T_ix−b_i)^2$的同时，使得 $∑_{i=1}^nx_i^2$不必太大的关系。

## 线性规划

另一类重要的优化问题是线性规划，它的目标函数和约束条件都是线性的。

这个不多讲了，高数学过的，很easy。