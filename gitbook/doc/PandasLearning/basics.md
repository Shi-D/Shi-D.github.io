# Pandas

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

```
df1.fillna(value=5)
```