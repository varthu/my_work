from django.test import TestCase
from django.urls import reverse

# Create your tests here.
def test_insert_filedetails_ajax(self):
    """
    Testcase run for Insert functions from views.insert_filedetails_ajax.
    """    
    w = self.insert_filedetails_ajax()
    url = reverse("insert.filedetails.ajax")
    resp = self.client.get(url)
    self.assertEqual(resp.status_code, 200)
    self.assertIn(w.title, resp.content)

def test_get_allfiles_ajax(self):
    """
    Testcase run for get all the datas from views.get_allfiles_ajax.
    """    
    w = self.get_allfiles_ajax()
    url = reverse("get.allfiles.ajax")
    resp = self.client.get(url)
    self.assertEqual(resp.status_code, 200)
    self.assertIn(w.title, resp.content)

def test_update_filedetails_ajax(self):
    """
    Testcase run for Update views.update_filedetails_ajax.
    """    
    w = self.update_filedetails_ajax()
    url = reverse("update.filedetails.ajax")
    resp = self.client.get(url)
    self.assertEqual(resp.status_code, 200)
    self.assertIn(w.title, resp.content)

def test_delete_filedetails_ajax(self):
    """
    Testcase run for delete views.delete_filedetails_ajax.
    """    
    w = self.delete_filedetails_ajax()
    url = reverse("delete.filedetails.ajax")
    resp = self.client.get(url)
    self.assertEqual(resp.status_code, 200)
    self.assertIn(w.title, resp.content)