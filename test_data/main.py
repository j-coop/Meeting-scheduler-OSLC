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


class Meeting:
    def __init__(self, organizer_id):
        self.meetingId = str(uuid.uuid4())
        self.title = fake.sentence()
        self.description = fake.paragraph()
        self.organiser = organizer_id
        self.status = random.choice(["SCHEDULED", "IN_PROGRESS", "COMPLETED"])
        self.meetingRecap = fake.text() if self.status == "COMPLETED" else None
        self.chosenProposal = str(uuid.uuid4()) if self.status == "COMPLETED" else None
        self.proposals = [str(uuid.uuid4()) for _ in range(random.randint(1, 3))]
        self.participations = [str(uuid.uuid4()) for _ in range(random.randint(1, 5))]


def generate_mock_users(num_users):
    users = [User().__dict__ for _ in range(num_users)]
    return users


def generate_mock_meetings(users):
    meetings = [Meeting(user["userId"]).__dict__ for user in users]
    return meetings


if __name__ == "__main__":
    num_users = 10
    mock_users = generate_mock_users(num_users)

    with open('data/users.json', "w") as json_file:
        json.dump(mock_users, json_file, indent=2)

    print("Mock users data written to users.json")

    mock_meetings = generate_mock_meetings(mock_users)

    with open('data/meetings.json', "w") as json_file:
        json.dump(mock_meetings, json_file, indent=2)

    print("Mock meetings data written to meetings.json")
