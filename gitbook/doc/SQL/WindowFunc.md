# 窗口函数

#### 1 基本形式

```
SELECT SUM() OVER(PARTITION BY ___ ORDER BY___) 
FROM Table 
```

注意：

- 聚合功能：在上述例子中，我们用了SUM()，但是你也可以用COUNT(), AVG()之类的计算功能
- PARTITION BY：你只需将它看成GROUP BY子句，但是在窗口函数中，你要写PARTITION BY
- ORDER BY：ORDER BY和普通查询语句中的ORDER BY没什么不同。注意，输出的顺序要仔细考虑
- 不能在group by的聚合函数内，嵌套窗口函数
- 可以在窗口函数内嵌套group by的聚合函数，该方法用在计算累计问题上比较多

#### 2 OVER()基本用法

 OVER() 不带参数，意思是所有的数据都在窗口中

```sql
SELECT
  first_name,
  last_name,
  salary,  
  AVG(salary) OVER()
FROM employee;
```

##### 2.1 对over()结果进一步计算

```sql
SELECT
  first_name,
  last_name,
  salary,
  AVG(salary) OVER(),
  salary - AVG(salary) OVER() as difference  -- as后跟别名
FROM employee;
```

##### 2.2 over()与count()组合

查询月薪超过4000的员工，并统计所有月薪超过4000的员工数量

```sql
select 
name,
salary,
count(id) over()
from employee
where salary>4000;
```

Where 执行的优先级：where子句优先于over()窗口函数，集合函数
先执行where子句，over()窗口函数，聚合函数

##### 2.3 在一条sql语句中使用两个窗口函数

创建报表，在purchase表基础上，添加平均价格和采购总金额两列
包含如下字段：`id`, `item`, `price`, 平均价格和所有物品总价格

```sql
select 
id,
item,
price,
avg(price) over() as `avg_price`,
sum(price) over() as `sum_price`
from purchase;
```

##### 2.4 不能在过滤条件where中使用over()

查询部门id为1，2，3三个部门员工的姓名，薪水，和这三个部门员工的平均薪资。

错误示例：

```sql
SELECT
  first_name,
  last_name,
  salary,
  AVG(salary) OVER()
FROM employee
WHERE salary > AVG(salary) OVER();
```

原因是，窗口函数在WHERE子句之后执行，把窗口函数写在WHERE子句中会导致循环依赖

#### 3 OVER(PARTITION BY)的使用

##### 3.1 基本语法

```sql
<window_function> OVER (PARTITION BY column1, column2 ... column_n)
```

`PARTITION BY` 的作用与 `GROUP BY`类似：将数据按照传入的列进行分组，与 `GROUP BY` 的区别是，`PARTITION BY` 不会改变结果的行数。

##### 3.2 PARTITION BY 传入多个字段

```sql
SELECT
  journey.id,
  journey.date,
  train.model,
  train.max_speed,
  MAX(max_speed) OVER(PARTITION BY route_id, date)
FROM journey
JOIN train
  ON journey.train_id = train.id;
```

#### 4 排序函数

##### 4.1 通过窗口函数实现排序

```sql
<ranking function> OVER (ORDER BY <order by columns>)
```

##### 4.2 rank()函数

```sql
RANK() OVER (ORDER BY ...)
```

`RANK()`会返回每一行的等级（序号） 

`ORDER BY`对行进行排序将数据按升序或降序排列

` RANK（）OVER（ORDER BY ...）`是一个函数，与`ORDER BY` 配合返回序号

==**总结**：有并列不连续==

比如：

> 小王 95 1
>
> 小李  95 1
>
> 小陈  90  3  （因为有并列，且并不连续，为3）

#### 4.3 dense_rank()函数

==RANK() 函数返回的序号，可能会出现不连续的情况==

==如果想在有并列情况发生的时候仍然返回连续序号可以使用 `dense_rank()函数`，总结：<font color=red >有并列且连续.</font>==

比如：

> 小王 95 1
>
> 小李  95 1
>
> 小陈  90  2  （因为有并列，且并不连续，为3）

#### 4.4 row_number()函数：返回行号

想获取排序之后的序号，也可以通过ROW_NUMBER() 来实现，从名字上就能知道，意思是返回行号。

==这个行号是不重复的！==（相同值的rank排序的序号相同，但是row_number返回的是排序后的行号，绝对不同。）

```sql
SELECT
  name,
  platform,
  editor_rating,
  ROW_NUMBER() OVER(ORDER BY editor_rating) `row_number`
FROM game;
```

> 小结：
>
> rank() 有并列不连续
>
> dense_rank() 有并列且连续
>
> row_number() 返回唯一的行号

#### 4.5 窗口函数中：rank()与order by多字段排序 

在列表中查找比较新,且安装包体积较小的游戏（`released` ，`size`)

```sql
SELECT
  name,
  genre,
  editor_rating,
  RANK() OVER(ORDER BY released DESC, size ASC) `rank`
FROM game;
```

#### 4.6 窗口函数外：使用rank() 与 order by

Before：

```sql
SELECT
  name,
  RANK() OVER (ORDER BY editor_rating) `rank`
FROM game;
```
After：

```sql
SELECT
  name,
  RANK() OVER (ORDER BY editor_rating) `rank`
FROM game
ORDER BY size DESC;
```

对比上面的结果，最终的结果是按size排序。

==<font color=red >窗口函数先执行，order by后执行。</font>==

==**执行顺序：from  > where > group by > having > 窗口函数  > order by**==

#### 4.7 NTILE()函数

==`NTILE(X)`函数将数据分成X组，并给每组分配一个数字（1，2，3....)==

```sql
SELECT
  name,
  genre,
  editor_rating,
  NTILE(3) OVER (ORDER BY editor_rating DESC)
FROM game;
```

`NTILE(3) OVER (ORDER BY editor_rating DESC) `是根据`editor_rating`的值排序后分成三个桶，编号为1,2,3

通过 `NTILE(3)` 我们根据`editor_rating` 的高低，将数据分成了三组，并且给每组指定了一个标记

1 这一组是评分最高的

3 这一组是评分较低的

2 这一组属于平均水平

<font color=red>注意：如果所有的数据不能被平均分组，那么有些组的数据会多一条，==数据条目多的组会排在前面==</font>

####  4.8 with 语句 分层查询：查询排名第几的...

<font color=orange >求排序第几的，一般都是用rank()、dense_rank()函数等排序函数排序，把序号字段添加到表上，再用with分层查询，select后用where子句找出具体排第几的。</font>（一般用dense_rank()因为有连续。）

例如：查找打分排名第二的游戏

```sql
WITH ranking AS (
  SELECT
    name,
    DENSE_RANK() OVER(ORDER BY editor_rating DESC) AS `rank`
  FROM game
)

SELECT name
FROM ranking
WHERE `rank` = 2;
```

```
with 表别名 as ( 第一层select，结果用表别名表示 ) 在上面的结果下再select 
```

#### 4.9 小结

最基本的排序函数: `RANK() OVER(ORDER BY column1, column2...)`

通过排序获取序号的函数介绍了如下三个：

-     ==RANK()== – 返回排序后的序号 rank ，有并列的情况出现时序号不连续
-     ==DENSE_RANK()== – 返回 连续 序号
-     ==ROW_NUMBER()== – 返回连续唯一的行号，与排序`ORDER BY` 配合返回的是连续不重复的序号

- ==NTILE(x)== – 将数据分组，并为每组添加一个相同的序号

获取排序后，指定位置的数据（第一位，第二位）可以通过如下

```sql
WITH ranking AS
  (SELECT
    RANK() OVER (ORDER BY col2) AS RANK,
    col1
  FROM table_name)

SELECT col1
FROM ranking
WHERE RANK = place1;
```

#### 5 其他函数

##### 5.1 **NTH_VALUE**

NTH_VALUE(time_took, 2) OVER (PARTITION BY exam_id ORDER BY time_took DESC) as max2_time_took

```
SELECT exam_id, duration, release_time
FROM (
    SELECT distinct exam_id, duration, release_time,
        NTH_VALUE(time_took, 2) OVER (PARTITION BY exam_id ORDER BY time_took DESC) as max2_time_took,
        NTH_VALUE(time_took, 2) OVER (PARTITION BY exam_id ORDER BY time_took ASC) as min2_time_took
    FROM (
        SELECT uid, exam_record.exam_id as exam_id, start_time, duration, release_time,
            TimeStampDiff(SECOND, start_time, submit_time) / 60 as time_took
        FROM exam_record
        LEFT JOIN examination_info using(exam_id)
        WHERE submit_time IS NOT NULL
    ) as t_exam_record_timetook
) as t_exam_time_took
WHERE max2_time_took IS NOT NULL and min2_time_took IS NOT NULL
    and max2_time_took-min2_time_took > duration / 2
ORDER BY exam_id DESC

```

##### 5.2 Lag/Lead

```sql
with people as
(
    select id, visit_date, people,
    Lag(people,2) over(order by id) as pprvPeople,
    Lag(people,1) over(order by id) as prvPeople,
    Lead(people,1) over(order by id) as nextPeople,
    Lead(people,2) over(order by id) as nnextPeople
    from stadium
)
select id, visit_date, people from people
where 
(people >= 100 and prvPeople>=100 and pprvPeople>=100) ||
(people >= 100 and nextPeople>=100 and nnextPeople>=100) ||
(people >= 100 and nextPeople>=100 and prvPeople>=100)
```
