# Python-tricks 2

## 异常

```python
try:
    f = open("test.txt", 'r')
    try:
        while True:
            line = f.readline()
            if not line:
                break
            time.sleep(2)
            print(line)

    finally:
        f.close()
        print("无论如何都要关闭文件，就是finally的作用")
except (NameError, IOError) as result:
    print("异常：", result)

print("我依然能输出")
```



## One-hot

```python
import numpy as np

labels = ['fs', 'dsa', 'rew', 'fs', 'tdet']

def encode_onehot(labels):
    classes = set(labels)
    classes_dict = {c: np.identity(len(classes))[i, :] for i, c in
                    enumerate(classes)}
    labels_onehot = np.array(list(map(classes_dict.get, labels)),
                             dtype=np.int32)
    return labels_onehot

    print(classes_dict)
    print(list(map(classes_dict.get, labels)))
    print(labels_onehot)
```

