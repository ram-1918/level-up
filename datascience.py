import pandas as pd
import numpy as np

lst = [1,2,3]
dic = {"day1": 420, "day2": 380, "day3": 390}

# Series, index, dict to series, list to series
series = pd.Series(dic, index=['day1','day3'])
# print(series)

''' Pandas
DataFrame, table with rows and columns, columns, 
[] in loc(to locate rows/indexes): DataFrame else series
### axis = 1(rows + horizontal), axis = 0(cols + vertical)
df.loc[row_index, 'column']
df.iloc[[row_indexes], [col_indexes]] => df.iloc[:, [True, False, True, False]] or df.iloc[[0,2], [1,3]] or df.iloc[1:, [-1]]
df.iat[1,1]    # Fast
df.dropna(subset=[], inplace=True)
df.drop(row_index, inplace=True)
df.fillna({'column': 'value'}, inplace=True)
Conditional: df[] df[(data['dupes'] == True) | (condn2)]
df.duplicated(): return bool (True for duplicate)
df.drop_duplicates()
df.plot(kind='scatter', x='column1', y='columns2')
df.merge(df2, on='column', how='inner/outer')
df.concat([frames], ignore_index=bool, sort=bool)    # Ignores overlapping index
df.shape, df.dim, df.rename(); df.coulumns, df.count(), df.describe(), 
df.diff(), df.any(), df.apply(), df.dtypes, df.T, df.copy()
df.isin([]), pd.isna(df), df.max(), df.sum()
df.sort_values(by='column_name'), df.sort_index(axis=1, ascending=bool)
'''

dataset = {
  'cars': ["BMW", "Volvo","Tesla"],
  'passings': [3, 7, 2]
}

# Read CSV file
# to_string()
# pd.options.display.max_columns = 10 or ...max_rows
# df.dropna(): removes the rows with empty cells, returns a new df, will not effect the original;
data = pd.read_csv('data.csv')
print(len(data['Calories']))

data.dropna(subset=['Calories', 'Duration'], inplace=True)    # manipulates the original 
# data.fillna({'Duration': data['Duration'].mean()}, inplace=True)   # First arg: dict(column_name, 'value_to_replace')
print(len(data['Calories']))

# Handling missing values/wrong format/duplicates
for i in data.index:
    boundary_value = 120
    if data.loc[i, 'Duration'] > boundary_value:
        # data.loc[i, 'Duration'] = boundary_value
        data.drop(i, inplace=True)

dupes = data.duplicated()
data['dupes'] = dupes

print(data[data['dupes'] == True])

cor = data.corr()
val = data.iloc[1:, [-1]] # data.iloc[:, [True, False, True, False]]


df = pd.DataFrame(
    np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 
    columns=['A', 'B', 'C']
    )

print(df.shape, '\n', df.max(axis=1))

''' Numpy
np.array([]), np.__version__
Each value in an array is 0-D array
arr.ndim, arr.shape, arr.dtype, arr.astype(type): i, u, S...
dtypes: i, b, u, f, c, m, S, M, O, U, V
can specify sizes for: i, u, f, S, U
* When numpy can't type cast then it raises a value error
arr.copy()[deep copy + will not get effected + independent], arr.view()[Shallow copy + will get effected + same reference]
arr.base: returns None if that is the owner else returns its owner array
arr.reshape(m, n, ...) # m, n .. are the new dimentions; m * n * ... should equals the number of elements in the arr
* Many functions for changing shapes and rearranging elements: flatten(arr.reshape(-1)), ravel, rot90, flip, fliplr, flipud
n-dimentional iter: nditer(arr, flags=['buffered'], op_dtypes=['S']); 
    -> dtype of element changes while iterating, 
    -> to make this happen it need some extra space so flags = ['buffered'], buffer space is used
'''

arr = np.array([[1,2,3,4], [6,7,8,9]], dtype='u1')
arr1 = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]) * 2

lst2d = [
        [
            [1,2,3], 
            [4,5,6]
        ], 
        [
            [1,2,3], 
            [4,5,6]
        ]
    ]


print(arr[1, ::6].dtype, arr[1, ::6])

deep = arr.copy()    # Deep copy + independent
shallow = arr.view()    # Shallow copy + dependent + same reference

print(deep.base, shallow.base)

# newarr = arr.reshape(1,2,5,1)   # It returns view, a shallow copy
# newarr[0,0,0,0] = 100

# newarr = np.array(lst2d).reshape(-1)
# print(newarr, '\n', arr)

# for i in np.nditer(arr1): === np.reshape(-1)
for idx, i in np.ndenumerate(arr1):
    print(idx, i)

print(type("ram".encode()))    # Encoded version converts string to bytes datatype
s = "\n ram\nchandra\n"
print(s.partition('r'), s.splitlines())

t = (1,2) + (1,2)
l1 = [1,2]
l2 = l1

l2 += [100]

print(id(l1), id(l2))

s1 = 'ram'
s2 = s1

print(id(s1), id(s2))

s1 += 'cha'

print(id(s1), id(s2))

thisset = {"apple", "banana", "cherry", True, 1, 2}
print(thisset)

# Strictly takes 0 positional arguments
def function(*, val):
    print(val)

function(val=3)

# strictly takes 0 keyword arguments
def function(val, /):
    print(val)

function(4)

# postional-only and keyword arguments
def function(a, b, /, *, c, d):
    print(a,b,c,d)

function(1,2,c=3,d=4)


print(dir(pd))