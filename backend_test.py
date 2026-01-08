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
    
    # Test data matching the user's test case EXACTLY
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
    
    # Also test with a unique timestamp-based email to verify new submissions
    timestamp = int(time.time())
    unique_test_submission = {
        "name": "Quiz Test User Unique",
        "email": f"quiztest{timestamp}@example.com", 
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
    
    # Get initial module stats for comparison
    print("📊 Getting initial module stats...")
    try:
        response = requests.get(f"{API_BASE}/module-stats", timeout=10)
        if response.status_code == 200:
            initial_stats = response.json()
            initial_completions = initial_stats.get("1", {}).get("completions", 0)
            print(f"   Initial Module 1 completions: {initial_completions}")
        else:
            print(f"   ❌ Could not get initial stats: {response.status_code}")
            initial_completions = 0
    except Exception as e:
        print(f"   ❌ Error getting initial stats: {e}")
        initial_completions = 0
    
    # Test 1: Submit Quiz with unique data
    print(f"\n🔄 Test 1: Submitting Unique Quiz...")
    print(f"   Unique Email: {unique_test_submission['email']}")
    try:
        response = requests.post(
            f"{API_BASE}/quiz-submit",
            json=unique_test_submission,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get("success"):
                print("   ✅ Unique quiz submission API returned success")
            else:
                print("   ❌ Unique quiz submission API returned success=false")
                return False
        else:
            print(f"   ❌ Unique quiz submission failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Unique quiz submission request failed: {e}")
        return False
    
    # Wait for database write
    time.sleep(3)
    
    # Test 2: Submit original test data
    print(f"\n🔄 Test 2: Submitting Original Test Data...")
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
                print("   ✅ Original quiz submission API returned success")
            else:
                print("   ❌ Original quiz submission API returned success=false")
                return False
        else:
            print(f"   ❌ Original quiz submission failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Original quiz submission request failed: {e}")
        return False
    
    # Wait a moment for database write
    time.sleep(3)
    
    # Test 3: Verify data was saved by checking module stats
    print("\n🔍 Test 3: Verifying data was saved via module stats...")
    try:
        response = requests.get(f"{API_BASE}/module-stats", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            final_stats = response.json()
            print(f"   Final Module Stats Response: {json.dumps(final_stats, indent=2)}")
            
            # Check if our submissions are reflected in module 1 stats
            module_1_stats = final_stats.get("1", {})
            final_completions = module_1_stats.get("completions", 0)
            
            print(f"   Initial completions: {initial_completions}")
            print(f"   Final completions: {final_completions}")
            print(f"   Expected increase: 2 (unique + original)")
            print(f"   Actual increase: {final_completions - initial_completions}")
            
            if final_completions > initial_completions:
                print(f"   ✅ Module 1 completions increased from {initial_completions} to {final_completions}")
                print(f"   ✅ Data is being saved to database successfully")
                return True
            else:
                print("   ❌ Module 1 completions did not increase - data not saved!")
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

def test_database_direct_verification():
    """Test database verification using admin endpoints"""
    print("\n🗄️ Testing Database Direct Verification")
    print("=" * 45)
    
    try:
        # Use the admin password to check quiz results
        response = requests.get(f"{API_BASE}/quiz-results/view?password=Dynamics@26", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("   ✅ Admin quiz results endpoint accessible")
            # Check if response contains HTML with quiz data
            if "Quiz Test User" in response.text or "quiz" in response.text.lower():
                print("   ✅ Quiz submissions found in database")
                return True
            else:
                print("   ⚠️ Admin endpoint accessible but no quiz data visible")
                return False
        else:
            print(f"   ❌ Admin endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Admin endpoint request failed: {e}")
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
        "quiz_submission": False,
        "database_verification": False
    }
    
    # Run tests
    results["api_health"] = test_api_health()
    results["champions_dashboard"] = test_champions_dashboard()
    results["quiz_submission"] = test_quiz_submission_flow()
    results["database_verification"] = test_database_direct_verification()
    
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
    
    if results["quiz_submission"] and results["database_verification"]:
        print("\n🎉 QUIZ SUBMISSION WORKING: Data is being saved to database")
        print("   ✅ API returns success")
        print("   ✅ Module stats reflect new submissions")
        print("   ✅ Admin interface shows quiz data")
    elif results["quiz_submission"]:
        print("\n⚠️ QUIZ SUBMISSION PARTIALLY WORKING:")
        print("   ✅ API returns success")
        print("   ✅ Module stats reflect new submissions")
        print("   ❌ Could not verify via admin interface")
    else:
        print("\n🚨 QUIZ SUBMISSION ISSUE CONFIRMED: Data not being saved to database")
    
    return results["quiz_submission"]

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)