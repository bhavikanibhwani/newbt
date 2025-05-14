import sys
from openai import OpenAI
def func (message: str):
    MODEL = "llama3.2"
    openai = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

    response = openai.chat.completions.create(
    model=MODEL,
    messages=[{"role": "user", "content": message}]
    )

    return response.choices[0].message.content
if __name__ == "__main__":
    message = sys.argv[1]  # Get the message from the command-line argument
    print(func(message))
