from django.shortcuts import render
from django.http import JsonResponse
import datetime
from os.path import splitext
from .utils import insert, fetch_all, update, delete, find_index_with_document

def insert_filedetails_ajax(request):
    """
    API Insert the files into Elasticsearch.
    """
    try:
        file_path = request.GET.get('file_path')
        file_name, extension = splitext(file_path)
        date_time = datetime.datetime.now().strftime("%Y.%m.%d_%H:%M:%S")
        json_obj = {"file_path": file_path, "extension": extension, "date_ingested": date_time}
        inserted_data = insert(json_obj)
        return JsonResponse({"data_inserted": inserted_data, "message": "Success", "status_code": "200"})
    except Exception as e:
        print("Insert Error : ", e)
        return False

def get_allfiles_ajax(request):
    """
    API get all the documents from Elasticsearch.
    """
    try:
        get_all = fetch_all()
        return JsonResponse({"fs_metadata": get_all['hits']['hits'], "message": "Success", "status_code": "200"})
    except Exception as e:
        print("Get All Documents Error : ", e)
        return False    

def update_filedetails_ajax(request):
    """
    API update using id and tag into Elasticsearch.
    """
    try:
        document_id = request.GET.get('document_id')
        tag = request.GET.get('tag')
        get_index = find_index_with_document(document_id)
        updated_data = update(get_index, document_id, tag)
        return JsonResponse({"fs_metadata": updated_data, "message": "Success", "status_code": "200"})
    except Exception as e:
        print("Update Error : ", e)
        return False

def delete_filedetails_ajax(request):
    """
    API delete documents using id from Elasticsearch.
    """
    try:
        document_id = request.GET.get('document_id')
        get_index = find_index_with_document(document_id)
        deleted_data = delete(get_index, document_id)
        return JsonResponse({"document_id": document_id, "message": "Success", "status_code": "200"})
    except Exception as e:
        print("Delete Error : ", e)
        return False