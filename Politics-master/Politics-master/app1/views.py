from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import districts, constituents, parties, party_member
from .utils import full_Political_details,data_members
from .forms import NameForm
from django.db.models import Q

def add_constituents(request):
    if request.method == 'POST':  # -->front to back(post-secure)
        constituent_id = request.POST.get("constituent_id")
        district_id = request.POST.get("district_dropdown")
        constituent_name = request.POST.get("constituent_name")
        # print(constituent_id,district_id,cons_name,"------------------------------>")
        constituent_save = constituents(constituent_id=constituent_id, constituent_name=constituent_name,
                                        district_id=district_id)
        constituent_save.save()
    data = districts.objects.all()
    # data = districts.objects.filter(district_name__startswith ="K")  #select*from districts;
    print(data,"----->")
    # for i in data:
    #     print(i.district_name)
    # data = constituents.objects.all()
    # data = [list(i) for i in data]
    return render(request, 'add_constituents.html', {'districts_list': data})#server side rendering


def add_parties(request):
    if request.method == 'POST':
        print("inside_add_parties")
        party_id = request.POST.get("party_id")
        party_symbol = request.POST.get("party_symbol")#names
        party_started = request.POST.get("party_started")
        started_leader = request.POST.get("started_leader")
        current_leader = request.POST.get("current_leader")
        party_name = request.POST.get("party_name")
        party_save = parties(party_id=party_id, party_symbol=party_symbol, party_started=party_started,
                             started_leader=started_leader, current_leader=current_leader, party_name=party_name)
        party_save.save()
    return render(request, 'parties.html')


def add_member(request):
    if request.method == 'POST':
        member_name = request.POST.get("member_name")
        member_age = request.POST.get("member_age")
        gender = request.POST.get("gender")
        constituent_id = request.POST.get("constituent_dropdown")
        party_id = request.POST.get("parties_dropdown")
        ruling_start_date = request.POST.get("ruling_start_date")
        print(member_name, member_age, constituent_id, party_id,ruling_start_date)
        member_save = party_member(member_name=member_name, member_age=member_age, constituent_id=constituent_id,party_id=party_id,ruling_start_date=ruling_start_date,gender=gender)
        member_save.save()        
    data = constituents.objects.all()#object.key
    data_parties = parties.objects.values_list('party_id', 'party_name')#list.index
    return render(request, 'members.html', {'member': data, 'parties': data_parties})

def view_all(request):
    data_constituents = constituents.objects.all() 
    data_parties = parties.objects.all()
    full_Political_details_ = full_Political_details()
    return render(request,'view_all.html', {'data':full_Political_details_,'data1':data_constituents,'data2':data_parties})  
     # return render(request, 'members.html', {'member': data, 'parties': data_parties})

def edit_member(request):
    if request.method == 'POST':
        uniqe_id = request.POST.get("edit")
        constituent_id = uniqe_id.split('_')[0]
        ruling_start_date = uniqe_id.split('_')[1]
        data_ = data_members(constituent_id,ruling_start_date)
        # print(data_members,"---->")
        dm = [[x[0],x[1],x[2],x[3],x[4].strftime('%Y-%m-%d'),x[5]] for x in data_]
        print(dm)
        data_constituents = constituents.objects.all()#object.key
        data_parties = parties.objects.values_list('party_id', 'party_name')#list.index
        return render(request, 'edit_member.html', {'data_constituents': data_constituents, 'parties': data_parties,'member_name':dm[0][0],'member_age':dm[0][1],'constituent_id':dm[0][2],'party_id':dm[0][3],'ruling_start_date':dm[0][4],'gender':dm[0][5]})
    return HttpResponseRedirect("/view_all")


def update_member(request):
    if request.method == 'POST':
        member_name = request.POST.get("member_name")
        member_age = request.POST.get("member_age")
        gender = request.POST.get("gender")
        constituent_id = request.POST.get("constituent_dropdown")
        party_id = request.POST.get("parties_dropdown")
        ruling_start_date = request.POST.get("ruling_start_date")
        print(member_name,member_age,gender,constituent_id,party_id,ruling_start_date,"+++++++++")
        update_ = party_member.objects.filter(Q(constituent_id=constituent_id) & Q(ruling_start_date=ruling_start_date)).update(member_name=member_name,member_age=member_age,gender=gender)
    return HttpResponseRedirect("/view_all")

