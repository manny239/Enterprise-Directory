import json

# Function to get the first names from the employees data
def get_first_names_from_employees(file_path):
    try:
        # Open the employees.json file and load its content
        with open(file_path, 'r') as file:
            employees = json.load(file)
        
        # Extract first names (split the full name and get the first part)
        first_names = [employee['name'].split()[0] for employee in employees]
        
        # Return the list of unique first names
        return list(set(first_names))  # Using set to ensure uniqueness

    except Exception as e:
        print(f"Error: {e}")
        return []

# File path to your employees.json
file_path = 'employees.json'

# Get first names
first_names = get_first_names_from_employees(file_path)

# Print the first names
print("First Names:", first_names)
