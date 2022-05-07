# VLOOKUP

https://www.bilibili.com/video/BV1EN411Z7UX/?spm_id_from=autoNext

## 基础

VLOOKUP(look_value, look_location, look_col, look_method)

look_method：0 精确查找，1 近似查找、找区间等

## 进阶

##### 1 屏蔽错误值 IFERROR

IFERROR(VLOOKUP(......), "")

##### 2 关键字词查找 通配符 ?*

VLOOKUP("\*"&F7&"\*", ...)

##### 3 文本数值混合查找

把数字变成文本  F7&""

把文本变成数字 F7*1

##### 4 去除空格查找 SUBSTITUDE 函数

查找值有空格，写成 SUBSTITUDE(F7, " ", "") -> 意即将“ ”空格字符串替换成空字符串

查找区域有空格，写成  SUBSTITUDE(\$A\$7:\$B\$9, " ", "")

##### 5 去除不可见字符查找

比如说名字前后有空格，查找区或查找值都可以进行 **CLEAN**

 CLEAN(F7)

 CLEAN(\$A\$7:\$B\$9)

##### 6 多列批量查找

查找值中，列锁定，行不锁定

VLOOKUP($F7, \$A\$7:\$B\$9, **COLUMN(b1)**, 0)

b1是excel表的第2列，对应查找表的第2列

##### 7 多列动态查找

 VLOOKUP($F7, \$A\$7:\$B\$9, **MATCH(J4, \$A\$7:\$B\$7)**, 0)

##### 8 一对多查找

> 将同一部门的员工，分成“员工1”、“员工2”

COUNTIF、COUNTIFS

COUNTIF(\$C\$85:C85, C85)

C85&COUNTIF(\$C\$85:C85, C85)

VLOOKUP(G85&COLUMN(a1), \$C\$85:\$C\$85, 3, 0) OR

VLOOKUP(G85&RIGHT('员工1', 1), \$C\$85:\$C\$85, 3, 0) 截取“员工1”字符串的右边1个字符

##### 9 多行合并查找

> 将同一部门的员工名字和冰岛一起，group by 部门，以‘,’间隔

##### 10 多表混合查询

IF(条件，成立，不成立)

##### 11 跨多表查找

INDIRECT("表"&COLUMN(a1)&"\$A\$3:\$F\$8") 把字符串变为地址

##  高阶

##### 1 反向查找

VLOOKUP(G7, IF({1, 0}, \$C\$7:\$C\$11, \$B\$7:\$B\$11), 2, 0)