[TOC]

# Basic

## 1 Word Embedding 词嵌入

### 1.1 One-hot表示

独热向量编码

### 1.2 词袋模型

词袋模型(Bag-of-words model)

**文档的向量表示可以直接将各词的词向量表示加和**。

如，

**John likes to watch movies. Mary likes too**

**John also likes to watch football games.**

以上两句可以构造一个词典，**{"John": 1, "likes": 2, "to": 3, "watch": 4, "movies": 5, "also": 6, "football": 7, "games": 8, "Mary": 9, "too": 10} **

那么第一句的向量表示为：**[1,2,1,1,1,0,0,0,1,1]**，其中的2表示**likes**在该句中出现了2次，依次类推。

词袋模型有以下**缺点**：

- 词向量化后，词与词之间是有大小关系的，不一定词出现的越多，权重越大。
- 词与词之间是没有顺序关系的。

### 1.3 TF-IDF

**TF-IDF**（**T**erm **F**requency – **I**nverse **D**ocument **F**requency）

**TF** 意思是词频 (Term Frequency)，**IDF** 意思是逆文本频率指数

**字词的重要性随着它在文件中出现的次数成正比增加，但同时会随着它在语料库中出现的频率成反比下降。一个词语在一篇文章中出现次数越多, 同时在所有文档中出现次数越少, 越能够代表该文章。**

1. $词频(TF) = \frac{某个词在文章中出现的次数}{文章的总词数}$

2. $逆文档频率(IDF) = log(\frac{语料库的文档总数}{包含该词的文档数+1})$

> 如果一个词越常见，那么分母就越大，逆文档频率就越小越接近0。
>
> 分母之所以要加1，是为了避免分母为0（即所有文档都不包含该词）。
>
> log 对得到的值取对数。

3. $TF-IDF = 词频(TF) * 逆文档频率(IDF)$

**缺点：**没有把词与词之间的关系顺序表达出来。

### 1.4 n-gram模型

n-gram 模型为了保持词的顺序，做了一个滑窗的操作，这里的n表示的就是滑窗的大小，例如 2-gram 模型，也就是把 2 个词当做一组来处理，然后向后移动一个词的长度，再次组成另一组词，把这些生成一个字典，按照词袋模型的方式进行编码得到结果。该模型考虑了词的顺序。

例如：

**John likes to watch movies. Mary likes too**

**John also likes to watch football games.**

以上两句可以构造一个词典，**{"John likes”: 1, "likes to”: 2, "to watch”: 3, "watch movies”: 4, "Mary likes”: 5, "likes too”: 6, "John also”: 7, "also likes”: 8, “watch football”: 9, "football games": 10}**

那么第一句的向量表示为：**[1, 1, 1, 1, 1, 1, 0, 0, 0, 0]**，其中第一个 1 表示 **John likes **在该句中出现了 1 次，依次类推。

**缺点：**随着 n 的大小增加，词表会成指数型膨胀，会越来越大。
