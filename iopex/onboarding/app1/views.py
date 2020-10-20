from django.http import JsonResponse 

def check(exp):
    first = ['(','{','[']
    last = [')','}',']']
    map = dict(zip(first,last))
    print(map)
    queue = []
    for i in exp:
        if i in first:
            queue.append(map[i])
        elif i in last:
            if not queue or i !=queue.pop():
                return "False"      
    if not queue:
        return "True"
    else:
        return "False"          

def match_ajax(request):
	inpt = request.GET.get('inpt')
	check(inpt)
	return JsonResponse({'result':check(inpt)}) 
