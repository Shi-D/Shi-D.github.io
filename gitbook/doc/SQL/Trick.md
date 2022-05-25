# Trick

- ==求累加/累计==
  - SUM(number) OVER(PARTITION BY user_id ORDER BY date) AS ps_num
- 后续 order by 等操作中，必须要用更换后的别名！
- ifnull(x1, x2) ：如果 x1 为 NULL， 返回 x2，否则返回 x1。
- IF(x1 is null, x2, x1)
- UPDATE table SET X, X WHERE X
- truncate table exam_record 重置表，只清除数据，保留表结构，不可恢复。（自增的也会重新清0）
- ALTER TABLE examination_info
  DROP INDEX uniq_idx_exam_id;  删除索引 uniq_idx_exam_id
- DROP INDEX  uniq_idx_exam_id ON examination_info;  删除索引 uniq_idx_exam_id
- DATEPART(yy-mm,start_time) 抽取日期的一部分
- date_format(start_time, '%Y%m') 将日期改成 YYYYMM格式
- SELECT LAST_DAY('2019-04-01') 取2019年4月的最后一天的日期。
  - day(last_day(submit_time)运算结果还是跟submit_time同样的一串数列，只有加上avg(),min()或max()运算才变成了一个数值作为分母使用
  - AVG(DAY(LAST_DAY(submit_time)))
- WHERE 条件句内的名称不能用 SELECT 里重命名的元素
- ==CONCAT_WS(':', DATE(start_time), tag)==
- ==GROUP_CONCAT==(DISTINCT CONCAT_WS(':', DATE(start_time), tag) SEPARATOR ';')
- BETWEEN 2 AND 4 包括2和4
- 行列互换（长表转为宽表即行转列，宽表转为长表即列转行）
  - 行转列，case when，sum if
    - -- 遍历值，这里max也可以替换为sum
      select name,
             max(case subject when '语文' then score else 0 end) as 语文,
             max(case subject when '数学' then score else 0 end) as 数学,
             max(case subject when '英语' then score else 0 end) as 英语
      from T
      group by name;
  - 列转行，union
- 关于索引
  - create方式创建索引：CREATE
    [UNIQUE -- 唯一索引
    | FULLTEXT -- 全文索引]
    INDEX index_name ON table_name -- 不指定唯一或全文时默认普通索引 
    (column1[(length) [DESC|ASC]] [,column2,...]) -- 可以对多列建立组合索引
  - alter方式创建索引：ALTER TABLE tb_name ADD [UNIQUE | FULLTEXT] [INDEX] index_content(content)
  - drop方式删除索引：DROP INDEX <索引名> ON <表名>
  - alter方式删除索引：ALTER TABLE <表名> DROP INDEX <索引名>
- 关于索引须知：
  - 索引使用时满足最左前缀匹配原则，即对于组合索引(col1, col2)，在不考虑引擎优化时，条件必须是col1在前col2在后，或者只使用col1，索引才会生效；
  - 索引不包含有NULL值的列
  - 一个查询只使用一次索引，where中如果使用了索引，order by就不会使用
  - like做字段比较时只有前缀确定时才会使用索引
  - 在列上进行运算后不会使用索引，如year(start_time)<2020不会使用start_time上的索引
- 用group by可以select中不出现，只出现在having中
- 起别名时，为防止和内部关键词相同，应该用``，而不是''
- COUNT(start_time)=COUNT(submit_time) COUNT不会对NULL进行统计，因此可以通过该表达式区分某时段内是否有未完成的试卷
- SUM(SUM(CASE
  WHEN if_follow=1 THEN 1
  WHEN if_follow=0 THEN 0
  ELSE -1 END))
  OVER(PARTITION BY author ORDER BY DATE_FORMAT(DATE(end_time),'%Y-%m'))
  - author是大类，月份是累加单位，所以partition by author, order by date
    两层sum是因为第一个sum是针对每一个月内进行计算，第二个sum是为了每一个author在不同月份的累加。
- sum(month_add_uv) over(order by start_month) as cum_sum_uv 用来求累计
- 牛客sql60:
  - SELECT emp_no, salary,   # 按员工编号求薪资累计
    SUM(salary) OVER(ORDER BY emp_no) AS running_total
    FROM salaries
    WHERE to_date = '9999-01-01'
    ORDER BY emp_no
  - over()中使用了order by子句，所以默认从第一行累计到当前行；若不使用order by子句，则会针对整个分区求和（此处没指定partition by，所以将整个表视为一个分区）
- Lag/Lead
- 连续三个
- 连续三个及以上，利用多表查询 
  - leetcode 601 https://leetcode.cn/problems/human-traffic-of-stadium/comments/ 
- 行转列，列转行
- with rollup，用来在分组统计数据的基础上再进行统计汇总，即用来得到group by的汇总信息