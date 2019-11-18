## Self Host 1pt
Self-hosting 1pt requires atleast `PHP 5` and a `mysqli` database.

### Sample `mysqli` Databse Structure

| | index | timestamp | short_url | long_url | desktop | mobile | apple | android | custom |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **type** | int | timestamp | text | text | text | text | text | text | text |
| **default** | AUTO_INCREMENT | current_timestamp() |  |  |  |  |  |  |  |
