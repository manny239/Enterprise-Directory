import pandas as pd
import json
from pathlib import Path

df = pd.read_parquet('../ml/datasets/dataset_clean.parquet')
Path("datasets").mkdir(parents=True, exist_ok=True)
df.to_json('./datasets/employees.json', orient='records')
print('Conversion complete!')

