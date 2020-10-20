from django.shortcuts import render
from django.http import JsonResponse
from tech_app.models import test_model , test_detail

def test(request):
	return  render(request,"test.html", )

def entry(request):
	if request.method == "GET":
		s_id = request.GET.get("id")
		msg = request.GET.get("msg")
		detail = request.GET.get("detail")
		result = request.GET.get("result")
		test_ = test_model(s_id = s_id, msg = msg, detail = detail, result = result)
		test_.save()
		return JsonResponse({'return_msg':result})
	return render(request,'test.html',)	 


def details(request):
	if request.method == "POST":
		name = request.GET.POST("name")
		email= request.GET.POST("email")
		phone no = request.GET.POST("phone")
		city = request.GET.POST("city")
		state = request.GET.POST("state")
		save1_ = test_detail(name = name,email = email,phone = phone,city = city, state = state)
		save1_.save()
	return render(request,"details.html",)


