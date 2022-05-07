# 字符串切割、截取、删除、替换

```sql
select
-- 替换法 replace(string, '被替换部分','替换后的结果')
-- device_id, replace(blog_url,'http:/url/','') as user_name
 
-- 截取法 substr(string, start_point, length*可选参数*)
-- device_id, substr(blog_url,11,length(blog_url)-10) as user_nam
 
-- 删除法 trim('被删除字段' from 列名)
-- device_id, trim('http:/url/' from blog_url) as user_name
 
-- 字段切割法 substring_index(string, '切割标志', 位置数（负号：从后面开始）)
device_id, substring_index(blog_url,'/',-1) as user_name
 
from user_submit;
```

