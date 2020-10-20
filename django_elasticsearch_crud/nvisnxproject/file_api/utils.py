from elasticsearch import Elasticsearch
import datetime
import json as json

def connection_es():
    """
    Establish Elasticsearch connection.
    And maintain data.
    """    
    client = Elasticsearch([{'host': 'localhost', 'port': 9200}])
    index_name = "fs_metadata_"
    return client, index_name

def insert(input_json):
    """
    Establish Elasticsearch connection.
    Insert data to the DB.
    """    
    client, index_name = connection_es()
    datetime_ = datetime.datetime.now().strftime("%Y.%m.%d_%H:%M:%S")
    fs_metadata_name = index_name+datetime_
    res = client.index(index = fs_metadata_name, doc_type = 'nvisnx', body = input_json)
    return res

def fetch_all():
    """
    Establish Elasticsearch connection.
    Get data from DB.
    """    
    client, index_name = connection_es()
    res = client.search(index = index_name+"*")
    return res

def update(get_index, document_id, tag):
    """
    Establish Elasticsearch connection.
    Update data to the DB.
    """    
    client, index_name = connection_es()
    res = client.update(index = get_index, doc_type = 'nvisnx', id = document_id, body= {"doc" : {"tag": tag}})
    return res

def delete(get_index, document_id):
    """
    Establish Elasticsearch connection.
    Delete data from DB.
    """    
    client, index_name = connection_es()
    resp = client.delete(index = get_index, doc_type="nvisnx", id = document_id)
    return resp

def find_index_with_document(document_id):
    """
    we had to loop through all data to find _index which is mandatory for records search 
    since we have document id as the only parameter .
    """    
    client, index_name = connection_es()
    res = client.search(index = index_name+"*")

    for record in res['hits']['hits']:
        if record['_id'] in document_id:
            return record['_index']