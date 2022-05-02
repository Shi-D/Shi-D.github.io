# Basics



## Missing data

 change/add/delete the index on a specified axis.

```python
df1 = df.reindex(index=dates[0:4], columns=list(df.columns) + ["E"])
```

To drop any rows that have missing data.

```python
df1.dropna(how="any")
```

Filling missing data.

```python
df1.fillna(value=5)
```

To get the boolean mask where values are `nan`

```
pd.isna(df1)
```

## Operations

Performing a descriptive statistic（列取平均）

```
df.mean()
```

Same operation on the other axis（行取平均）

```
df.mean(1)
```



## Reshaping

MultiIndex 多级索引

```python
tuples = list(
    zip(
        *[
            ["bar", "bar", "baz", "baz", "foo", "foo", "qux", "qux"],
            ["one", "two", "one", "two", "one", "two", "one", "two"],
        ]
    )
)

index = pd.MultiIndex.from_tuples(tuples, names=["first", "second"])
df = pd.DataFrame(np.random.randn(8, 2), index=index, columns=["A", "B"])
df2 = df[:4]

Out[95]: 
                     A         B
first second                    
bar   one    -0.727965 -0.589346
      two     0.339969 -0.693205
baz   one    -0.339355  0.593616
      two     0.884345  1.591431
```

### Stack

```python
stacked = df2.stack()

Out[97]: 
first  second   
bar    one     A   -0.727965
               B   -0.589346
       two     A    0.339969
               B   -0.693205
baz    one     A   -0.339355
               B    0.593616
       two     A    0.884345
               B    1.591431
dtype: float64


stacked.unstack()

Out[98]: 
                     A         B
first second                    
bar   one    -0.727965 -0.589346
      two     0.339969 -0.693205
baz   one    -0.339355  0.593616
      two     0.884345  1.591431


stacked.unstack(1)  # 也可以指定stack的index

Out[99]: 
second        one       two
first                      
bar   A -0.727965  0.339969
      B -0.589346 -0.693205
baz   A -0.339355  0.884345
      B  0.593616  1.591431
  

```