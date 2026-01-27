import os
import openai
from openai import OpenAI
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ChatMessage
from dotenv import load_dotenv

load_dotenv()

class ChatView(APIView):
    def post(self, request):
        message = request.data.get('message')
        
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return Response({"response": "Server configuration error: API Key missing."}, status=500)

        # Configure OpenAI client
        if api_key.startswith("sk-or-"):
            client = OpenAI(
                api_key=api_key,
                base_url="https://openrouter.ai/api/v1",
                default_headers={
                    "HTTP-Referer": "https://zsy.io", # Optional
                    "X-Title": "Zsyio", # Optional
                }
            )
            model = "google/gemini-flash-1.5-8b" # Specific 8B model slug
        else:
            client = OpenAI(api_key=api_key)
            model = "gpt-4o"

        try:
            # Call OpenAI API
            completion = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": message},
                ]
            )
            bot_reply = completion.choices[0].message.content
        except Exception as e:
            # Fallback or error handling
            # Error calling OpenAI suppressed
            # Note: The user requested hypothetical API usage. If this fails, it returns the error.
            bot_reply = f"Error processing request: {str(e)}"

        chat = ChatMessage.objects.create(user_message=message, bot_response=bot_reply)
        return Response({"response": bot_reply, "id": chat.id})
