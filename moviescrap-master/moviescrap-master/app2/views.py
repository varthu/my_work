from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import movie_details,soundtrack
from .utils import add_soundtrack
from django.db.models import Q



def add_moviedetails(request):
    data1 = ''
    if request.method == 'POST':
        try:
            movie_id = request.POST.get('movie_id')
            movie_name = request.POST.get('movie_name')
            soundtrack_id = request.POST.get('soundtrack_id')
            print(movie_name, "----------------->")
            details_save = movie_details(movie_id=movie_id, movie_name=movie_name)
            print("details_save", "----------------------------->")
            details_save.save()
            print(details_save.movie_id)
            soundtrack_list = add_soundtrack(movie_name)
            print(soundtrack_list,"soundtrack_list")
            if len(soundtrack_list) != 0:             
                for i in soundtrack_list:
                    if len(i) ==4: 
                        print(i)
                        print(details_save.movie_id,soundtrack_id,i[1],i[2],i[3])
                        soundtrack_list_save = soundtrack(movie_id=details_save.movie_id,soundtrack_id = soundtrack_id,title=i[1],singer=i[2],length=i[3])
                        soundtrack_list_save.save()
                data1 = soundtrack.objects.filter(movie_id=details_save.movie_id)
                print("soundtrack inserted ......   next fetch inserted soundtrack")
                # data1 = soundtrack.objects.all()
                print(data1)
                return render(request, 'login.html',{'data' : data1})
            else:
                movie_details.objects.filter(movie_name=movie_name).delete()
                return render(request, 'login.html',{'error':'Scrapping not happen properly please try again...'})
        except Exception as e:
            print("ERRRRRRRRROOOOOORRRRRRR",e)
            movie_id = movie_details.objects.filter(movie_name=movie_name).values('movie_id')
            print(movie_id)
            data1 = soundtrack.objects.filter(movie_id=details_save.movie_id)
            print(data1,"-------->")
            return render(request, 'login.html',{'error':'MOVIE NAME ALREADY EXIST', 'data':data1})
    return render(request, 'login.html')




