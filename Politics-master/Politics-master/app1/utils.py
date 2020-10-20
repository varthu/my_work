from django.db import connections #-->ad-hoc query

def full_Political_details():
	cursor_ = connections['default'].cursor() 
	sql = '''select districts.district_name,constituents.constituent_name,party_member.member_name,parties.party_name,parties.current_leader,parties.party_symbol,party_member.gender,CONCAT(party_member.constituent_id, '_', party_member.ruling_start_date) AS date_id from party_member 
inner join constituents on party_member.constituent_id=constituents.constituent_id 
inner join districts on constituents.district_id= districts.district_id 
inner join parties on parties.party_id=party_member.party_id;'''
	cursor_.execute(sql)
	rv = cursor_.fetchall()
	print(rv)
	return [list(i) for i in rv]

def data_members(constituent_id,ruling_start_date):
	cursor_ = connections['default'].cursor() 
	sql = "select * from party_member where constituent_id = "+constituent_id+" and ruling_start_date = '"+ruling_start_date+"';"
	cursor_.execute(sql)
	rv = cursor_.fetchall()
	print(rv)
	return [list(i) for i in rv]
