from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import json
from datetime import datetime

def file_seperator_view(request):
    if request.method == 'POST':
        info = request.POST.get("info")
        info_json = json.loads(info)#info string is converted into json format using json.loads
        myfile = request.FILES.getlist('files')
        for i in myfile:
            seperated_date = info_json[str(i)].split("+")[0]
            print(info_json,str(i),info_json[str(i)],"---------------->")
            date_ = datetime.strptime(seperated_date, "%a %b %d %Y %H:%M:%S %Z")
            fs = FileSystemStorage()
            filename = fs.save(date_.strftime("%d.%m.%Y")+'/'+date_.strftime("%H_%M_%S")+str(i), i)
    		
    return render(request, 'upload.html')