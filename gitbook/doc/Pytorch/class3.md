[TOC]

# 一些Tricks

## Tensor 线性代数计算

### 1 torch.trace

计算矩阵的迹（对角线元素和）

```python
In [22]: import torch as t

In [23]: a = t.arange(1, 10).view(3,3)

In [24]: a
Out[24]: 
tensor([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]])

In [25]: a.trace()
Out[25]: tensor(15)
```



### 2 torch.diag

获取对角阵

```python
In [24]: a
Out[24]: 
tensor([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]])

In [26]: a.diag()
Out[26]: tensor([1, 5, 9])

In [27]: a.diag(diagonal=1)
Out[27]: tensor([2, 6])

In [28]: a.diag(diagonal=2)
Out[28]: tensor([3])
```



### 3 torch.t

矩阵转置

```python
In [24]: a
Out[24]: 
tensor([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]])

In [30]: a.t()
Out[30]: 
tensor([[1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]])

In [31]: 
```



### 4 torch.inverse

可逆矩阵求逆

```python
In [37]: z = t.Tensor([[0,1,2], [1,1,4],[2,-1,0]])

In [38]: z
Out[38]: 
tensor([[ 0.,  1.,  2.],
        [ 1.,  1.,  4.],
        [ 2., -1.,  0.]])

In [39]: z.inverse()
Out[39]: 
tensor([[ 2.0000, -1.0000,  1.0000],
        [ 4.0000, -2.0000,  1.0000],
        [-1.5000,  1.0000, -0.5000]])

In [40]: 

```



### 5 torch.triu/tril

`torch.triu`上三角矩阵

`torch.tril`下三角矩阵

```python
In [40]: a
Out[40]: 
tensor([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]])

In [41]: a.triu()
Out[41]: 
tensor([[1, 2, 3],
        [0, 5, 6],
        [0, 0, 9]])
```



### 6 torch.mm

```python
In [46]: a = t.arange(1, 5).view(2,2)

In [47]: a
Out[47]: 
tensor([[1, 2],
        [3, 4]])

In [48]: b = t.arange(2, 6).view(2,2)

In [49]: b
Out[49]: 
tensor([[2, 3],
        [4, 5]])

In [50]: a.mm(b)
Out[50]: 
tensor([[10, 13],
        [22, 29]])

In [51]: 
```



### 7 torch.dot

向量内积

**注意区别numpy里的dot，numpy里的dot是矩阵乘法。**

```python
In [62]: torch.dot(torch.tensor([2, 3]), torch.tensor([2, 1]))
Out[62]: tensor(7)

In [56]: a
Out[56]: 
tensor([[1, 2],
        [3, 4]])

In [57]: b
Out[57]: 
tensor([[2, 3],
        [4, 5]])
```



## matmul \ mm \ bmm 区别

顾名思义, 就是两个batch矩阵乘法.

> 对位相乘用torch.mul；二维矩阵乘法用torch.mm；batch二维矩阵用torch.bmm；batch，广播用torch.matmul

mm只能进行矩阵乘法，也就是输入的两个 tensor 维度只能是(b * m)、(m * k) 得到（b * k）

bmm是两个三维 tensor 相乘，两个tensor维度是，（b * m * n）, (b * n * k) 得到 (b * m * k)

matmul可以进行张量乘法，输入可以是高维



## 其他

tendor转numpy

```python
test_y = torch.Tensor([1, 2, 3])
test_y = test_y.detach().numpy()
```

