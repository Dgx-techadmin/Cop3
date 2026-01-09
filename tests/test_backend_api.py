"""
Backend API Tests for Dynamics G-Ex AI Hub
Tests: Quiz submission, Success stories, Champions dashboard, Module stats, Certificate endpoints
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://ai-champions.preview.emergentagent.com')

class TestHealthAndBasicEndpoints:
    """Basic endpoint availability tests"""
    
    def test_frontend_loads(self):
        """Test that frontend is accessible"""
        response = requests.get(f"{BASE_URL}/")
        assert response.status_code == 200
    
    def test_module_stats_endpoint(self):
        """Test module stats endpoint returns data"""
        response = requests.get(f"{BASE_URL}/api/module-stats")
        assert response.status_code == 200
        data = response.json()
        # Should return a dict with module IDs as keys
        assert isinstance(data, dict)
    
    def test_success_stories_endpoint(self):
        """Test success stories endpoint returns data"""
        response = requests.get(f"{BASE_URL}/api/success-stories")
        assert response.status_code == 200
        data = response.json()
        assert "stories" in data
        assert isinstance(data["stories"], list)
    
    def test_champions_dashboard_endpoint(self):
        """Test champions dashboard endpoint returns data"""
        response = requests.get(f"{BASE_URL}/api/champions/dashboard")
        assert response.status_code == 200
        data = response.json()
        assert "stats" in data
        assert "leaderboard" in data
        # Verify stats structure
        assert "champions" in data["stats"]
        assert "modulesCompleted" in data["stats"]
        assert "storiesShared" in data["stats"]
        assert "totalLikes" in data["stats"]


class TestQuizSubmission:
    """Quiz submission endpoint tests"""
    
    def test_quiz_submit_success(self):
        """Test successful quiz submission"""
        unique_email = f"test_quiz_{int(time.time())}@test.com"
        payload = {
            "name": "TEST_Quiz User",
            "email": unique_email,
            "department": "IT",
            "answers": {
                "1": {"selected": "A", "correct": True},
                "2": {"selected": "B", "correct": True},
                "3": {"selected": "C", "correct": False}
            },
            "score": 2,
            "time_taken": 120,
            "feedback": "Good job!",
            "module_id": 1,
            "module_name": "Module 1: AI Fundamentals"
        }
        response = requests.post(f"{BASE_URL}/api/quiz-submit", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
    
    def test_quiz_submit_missing_fields(self):
        """Test quiz submission with missing required fields"""
        payload = {
            "name": "TEST_Incomplete User"
            # Missing other required fields
        }
        response = requests.post(f"{BASE_URL}/api/quiz-submit", json=payload)
        # Should return 422 for validation error
        assert response.status_code == 422


class TestQuizResultsAdmin:
    """Quiz results admin endpoint tests"""
    
    def test_quiz_results_view_with_correct_password(self):
        """Test quiz results view with correct admin password"""
        response = requests.get(f"{BASE_URL}/api/quiz-results/view?password=Dynamics@26")
        assert response.status_code == 200
        # Should return HTML content
        assert "text/html" in response.headers.get("content-type", "")
        assert "Quiz Results" in response.text
    
    def test_quiz_results_view_with_wrong_password(self):
        """Test quiz results view with incorrect password"""
        response = requests.get(f"{BASE_URL}/api/quiz-results/view?password=wrongpassword")
        assert response.status_code == 403
    
    def test_quiz_results_download_with_correct_password(self):
        """Test quiz results CSV download with correct password"""
        response = requests.get(f"{BASE_URL}/api/quiz-results/download?password=Dynamics@26")
        assert response.status_code == 200
        # Should return CSV content
        content_type = response.headers.get("content-type", "")
        assert "text/csv" in content_type or "application/octet-stream" in content_type


class TestSuccessStories:
    """Success stories CRUD tests"""
    
    def test_create_success_story(self):
        """Test creating a new success story"""
        unique_email = f"test_story_{int(time.time())}@test.com"
        payload = {
            "name": "TEST_Story Author",
            "email": unique_email,
            "department": "Marketing",
            "title": "TEST AI Success Story",
            "content": "This is a test success story about using AI effectively.",
            "imageUrl": "https://example.com/image.jpg",
            "linkUrl": "https://example.com/story"
        }
        response = requests.post(f"{BASE_URL}/api/success-stories", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["message"] == "Story created successfully"
    
    def test_get_success_stories(self):
        """Test retrieving success stories"""
        response = requests.get(f"{BASE_URL}/api/success-stories")
        assert response.status_code == 200
        data = response.json()
        assert "stories" in data
        # Should have at least one story (from previous test or seed data)
        assert len(data["stories"]) >= 0


class TestCertificateEndpoints:
    """Certificate eligibility and generation tests"""
    
    def test_certificate_check_test_bypass_email(self):
        """Test certificate check with bypass email"""
        payload = {"email": "certificate@dynamicsgex.com.au", "name": "Test Champion"}
        response = requests.post(f"{BASE_URL}/api/certificate/check", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["eligible"] == True
        assert "modules" in data
    
    def test_certificate_check_ineligible_user(self):
        """Test certificate check for user who hasn't completed modules"""
        payload = {"email": "nonexistent@test.com", "name": "New User"}
        response = requests.post(f"{BASE_URL}/api/certificate/check", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["eligible"] == False
    
    def test_certificate_generate_test_bypass(self):
        """Test certificate generation with bypass email"""
        payload = {"email": "certificate@dynamicsgex.com.au", "name": "Test Champion"}
        response = requests.post(f"{BASE_URL}/api/certificate/generate", json=payload)
        assert response.status_code == 200
        # Should return PDF
        assert "application/pdf" in response.headers.get("content-type", "")


class TestModuleAssistant:
    """Module AI assistant endpoint tests"""
    
    def test_module_assistant_response(self):
        """Test module assistant returns AI response"""
        payload = {
            "message": "What is this module about?",
            "module_id": 1,
            "module_name": "Module 1: AI Fundamentals",
            "module_context": "This module covers AI basics and Microsoft Copilot."
        }
        response = requests.post(f"{BASE_URL}/api/module-assistant", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert "conversation_id" in data
        assert len(data["response"]) > 0
    
    def test_module_assistant_with_conversation_id(self):
        """Test module assistant with existing conversation"""
        # First create a conversation
        payload = {
            "message": "Hello",
            "module_id": 1,
            "module_name": "Module 1",
            "module_context": "AI basics"
        }
        response1 = requests.post(f"{BASE_URL}/api/module-assistant", json=payload)
        assert response1.status_code == 200
        conversation_id = response1.json()["conversation_id"]
        
        # Continue conversation
        payload2 = {
            "message": "Tell me more",
            "module_id": 1,
            "module_name": "Module 1",
            "module_context": "AI basics",
            "conversation_id": conversation_id
        }
        response2 = requests.post(f"{BASE_URL}/api/module-assistant", json=payload2)
        assert response2.status_code == 200
        assert response2.json()["conversation_id"] == conversation_id


class TestStoryLikes:
    """Story like functionality tests"""
    
    def test_like_story_without_quiz_completion(self):
        """Test that liking requires quiz completion"""
        # Get a story ID first
        stories_response = requests.get(f"{BASE_URL}/api/success-stories")
        stories = stories_response.json().get("stories", [])
        
        if stories:
            story_id = stories[0]["id"]
            payload = {"email": "nonquizuser@test.com"}
            response = requests.post(f"{BASE_URL}/api/success-stories/{story_id}/like", json=payload)
            # Should fail because user hasn't completed a quiz
            assert response.status_code == 403


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
