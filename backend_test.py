#!/usr/bin/env python3
"""
Backend API Testing for AI Learning Hub - Quiz Submission Flow
Testing the reported issue where quiz submissions show success but aren't saved to database.
"""

import requests
import json
import time
from datetime import datetime
import sys

# Configuration
BACKEND_URL = "https://ai-learning-hub-168.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

def test_quiz_submission_flow():
    """Test the complete quiz submission flow as reported by user"""
    print("🧪 Testing Quiz Submission Flow")
    print("=" * 50)
    
    # Test data matching the user's test case
    test_submission = {
        "name": "Quiz Test User",
        "email": "quiztest@example.com", 
        "department": "Sales",
        "answers": {
            "1": {"selected": "A", "correct": True},
            "2": {"selected": "B", "correct": False},
            "3": {"selected": "C", "correct": True},
            "4": {"selected": "A", "correct": True},
            "5": {"selected": "B", "correct": True},
            "6": {"selected": "C", "correct": False},
            "7": {"selected": "A", "correct": True},
            "8": {"selected": "B", "correct": True},
            "9": {"selected": "C", "correct": True},
            "10": {"selected": "A", "correct": True}
        },
        "score": 8,  # 8 out of 10 correct
        "time_taken": 300,  # 5 minutes
        "feedback": "Good understanding of AI fundamentals with room for improvement in governance concepts.",
        "module_id": 1,
        "module_name": "Module 1"
    }
    
    print(f"📝 Test Data:")
    print(f"   Name: {test_submission['name']}")
    print(f"   Email: {test_submission['email']}")
    print(f"   Department: {test_submission['department']}")
    print(f"   Score: {test_submission['score']}/10")
    print(f"   Module: {test_submission['module_name']}")
    print()
    
    # Test 1: Submit Quiz
    print("🔄 Test 1: Submitting Quiz...")
    try:
        response = requests.post(
            f"{API_BASE}/quiz-submit",
            json=test_submission,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get("success"):
                print("   ✅ Quiz submission API returned success")
            else:
                print("   ❌ Quiz submission API returned success=false")
                return False
        else:
            print(f"   ❌ Quiz submission failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Quiz submission request failed: {e}")
        return False
    
    # Wait a moment for database write
    time.sleep(2)
    
    # Test 2: Verify data was saved by checking module stats
    print("\n🔍 Test 2: Verifying data was saved via module stats...")
    try:
        response = requests.get(f"{API_BASE}/module-stats", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            stats = response.json()
            print(f"   Module Stats Response: {json.dumps(stats, indent=2)}")
            
            # Check if our submission is reflected in module 1 stats
            module_1_stats = stats.get("1", {})
            completions = module_1_stats.get("completions", 0)
            
            if completions > 0:
                print(f"   ✅ Module 1 shows {completions} completion(s)")
                print(f"   ✅ Data appears to be saved to database")
                return True
            else:
                print("   ❌ Module 1 shows 0 completions - data not saved!")
                return False
        else:
            print(f"   ❌ Module stats request failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Module stats request failed: {e}")
        return False

def test_api_health():
    """Test basic API connectivity"""
    print("🏥 Testing API Health")
    print("=" * 30)
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=5)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            print("   ✅ API is accessible")
            return True
        else:
            print(f"   ❌ API returned status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ API health check failed: {e}")
        return False

def test_champions_dashboard():
    """Test champions dashboard endpoint that was working in previous tests"""
    print("\n📊 Testing Champions Dashboard (Reference)")
    print("=" * 40)
    
    try:
        response = requests.get(f"{API_BASE}/champions/dashboard", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Champions dashboard accessible")
            print(f"   Stats: {data.get('stats', {})}")
            return True
        else:
            print(f"   ❌ Champions dashboard failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Champions dashboard request failed: {e}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 AI Learning Hub - Backend API Testing")
    print("Testing Quiz Submission Issue")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    results = {
        "api_health": False,
        "champions_dashboard": False,
        "quiz_submission": False
    }
    
    # Run tests
    results["api_health"] = test_api_health()
    results["champions_dashboard"] = test_champions_dashboard()
    results["quiz_submission"] = test_quiz_submission_flow()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 TEST SUMMARY")
    print("=" * 60)
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"   {test_name.replace('_', ' ').title()}: {status}")
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if results["quiz_submission"]:
        print("\n🎉 QUIZ SUBMISSION WORKING: Data is being saved to database")
    else:
        print("\n🚨 QUIZ SUBMISSION ISSUE CONFIRMED: Data not being saved to database")
    
    return results["quiz_submission"]

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)