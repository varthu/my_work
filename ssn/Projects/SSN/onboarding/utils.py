from django.db import connections

def view_(student_roll_number):
    sql = "select * from student where student_roll_number="+str(student_roll_number)+";"
    cur = connections['default'].cursor()
    cur.execute(sql)
    row_headers = [x[0] for x in cur.description]  # this will extract row headers
    rv = cur.fetchall()
    return dict(genres=[list(i) for i in rv])

def insert():
    sql = "select * from student;"
    cur = connections.cursor()
    cur.execute(sql)
    row_headers = [x[0] for x in cur.description]  # this will extract row headers
    rv = cur.fetchall()
    return dict(genres=[list(i) for i in rv])