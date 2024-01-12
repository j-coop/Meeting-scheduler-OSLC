import json
from faker import Faker
import uuid
import random

fake = Faker()


class User:
    def __init__(self):
        self.userId = str(uuid.uuid4())
        self.login = fake.user_name()
        self.fullName = fake.name()
        self.email = fake.email()
        self.timezone = fake.timezone()
        self.password = fake.password()
        self.meetings = [str(uuid.uuid4()) for _ in range(random.randint(1, 10))]


def generate_mock_users(num_users):
    users = [User().__dict__ for _ in range(num_users)]
    return users


if __name__ == "__main__":
    num_users = 10
    mock_users = generate_mock_users(num_users)

    path = 'data/user.json'

    with open(path, "w") as json_file:
        json.dump(mock_users, json_file, indent=2)

    print("Mock users data written to mock_users.json")
