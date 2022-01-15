[TOC]

# PytorchTrick

# matmul \ mm \ bmm 区别

顾名思义, 就是两个batch矩阵乘法.



mm只能进行矩阵乘法，也就是输入的两个 tensor 维度只能是(b * m)、(m * k) 得到（b * k）

bmm是两个三维 tensor 相乘，两个tensor维度是，（b * m * n）, (b * n * k) 得到 (b * m * k)

matmul可以进行张量乘法，输入可以是高维