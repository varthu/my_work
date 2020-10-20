
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from onboarding.models import student
from onboarding.utils import view_
from django.http import JsonResponse


@login_required
def home_faculty(request):
    if request.method == 'POST':
        student_roll_number = request.POST.get("student_roll_number")
        student_name = request.POST.get("student_name")
        branch = request.POST.get("branch")
        mode_of_admission = request.POST.get("mode_of_admission")
        mobile_number = request.POST.get("mobile_number")
        email = request.POST.get("email")
        current_address = request.POST.get("current_address")
        permanent_address = request.POST.get("permanent_address")
        father_name = request.POST.get("father_name")
        father_mobile_number = request.POST.get("father_mobile_number")
        created_dt = request.POST.get("created_dt")
        print(student_name,branch,mode_of_admission,mobile_number,email,current_address,permanent_address,father_name,father_mobile_number)
        student.objects.filter(student_roll_number=student_roll_number).update(student_roll_number = student_roll_number,student_name = student_name,branch = branch,mode_of_admission = mode_of_admission,mobile_number = mobile_number,email = email,current_address = current_address,permanent_address = permanent_address,father_name = father_name,father_mobile_number = father_mobile_number,created_dt = created_dt)
        print(view_(student_roll_number))
        return render(request, 'home_faculty.html')
    return render(request, 'home_faculty.html')


@login_required
def home_student(request):
    if request.method == 'POST':
        student_roll_number = request.POST.get("student_roll_number")
        student_name = request.POST.get("student_name")
        branch = request.POST.get("branch")
        mode_of_admission = request.POST.get("mode_of_admission")
        mobile_number = request.POST.get("mobile_number")
        email = request.POST.get("email")
        current_address = request.POST.get("current_address")
        permanent_address = request.POST.get("permanent_address")
        father_name = request.POST.get("father_name")
        father_mobile_number = request.POST.get("father_mobile_number")
        created_dt = request.POST.get("created_dt")
        print(student_name,branch,mode_of_admission,mobile_number,email,current_address,permanent_address,father_name,father_mobile_number)
        student_ = student(student_roll_number = student_roll_number,student_name = student_name,branch = branch,mode_of_admission = mode_of_admission,mobile_number = mobile_number,email = email,current_address = current_address,permanent_address = permanent_address,father_name = father_name,father_mobile_number = father_mobile_number,created_dt = created_dt)
        student_.save()
        return render(request, 'home_student.html')
    return render(request, 'home_student.html')

def rollnumber_match(request):
    student_roll_number = request.GET.get("student_roll_number")
    print(student_roll_number)
    return JsonResponse(view_(student_roll_number))

from django.contrib import messages

def login_(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        # user = authenticate(username=username, password=password)
        # print(username,"----p----",password,user)
        
        if user is not None:
            if user.is_active:
                login(request,user)
                if(request.user.groups.filter(name='faculty').exists()):
                    return HttpResponseRedirect('/faculty')
                elif(request.user.groups.filter(name='students').exists()):
                    return HttpResponseRedirect('/student')
        else:
            messages.error(request,'Id/Password Incorrect')
            return redirect('login')
    return render(request, 'registration/login.html')