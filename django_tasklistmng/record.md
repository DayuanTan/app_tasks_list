# Records

## Django init

proj_tasks_list(main✗) ]$ ```django-admin startproject django_tasklistmng```

proj_tasks_list(main✗) ]$ ```source venv/bin/activate```
(vene)



(vene) proj_tasks_list(main✗) ]
 $ ```cd django_tasklistmng```


(vene) proj_tasks_list/django_tasklistmng(main✗) ]
 $  ```python manage.py runserver```
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
March 30, 2022 - 23:19:01
Django version 3.2.12, using settings 'django_tasklistmng.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```


(vene) proj_tasks_list/django_tasklistmng(main✗) ]
 $ ```python manage.py startapp apptasklistmng```



**change** proj_tasks_list/django_tasklistmng/apptasklistmng/views.py

**create** proj_tasks_list/django_tasklistmng/apptasklistmng/urls.py

**change** proj_tasks_list/django_tasklistmng/django_tasklistmng/urls.py


## Database

### Connect 
**change** proj_tasks_list/django_tasklistmng/django_tasklistmng/settings.py DATABASES TIME_ZONE

**create** proj_tasks_list/django_tasklistmng/my.cnf (same level as manage.py)



### **Integrate** existing database (apptasklistmng) into django:
  

(vene) proj_tasks_list/django_tasklistmng/databasesetup(main✗) ]
 $ ```mysql -u root < setup.sql```
``` 
Tables_in_apptasklistmng
Tasks
UserChangeRecords
UserLoginActivityRecords
Users
userno	userfirstname	usermiddlename	userlastname	usernickname	useremail	usergender	userpwd	userdob	usernote1	usernote2
1	testfirstname	testmiddlename	testlastname	testnickname	testemail	testmale	testpwd	2022-03-30	1	testnote2
```

(vene) proj_tasks_list/django_tasklistmng(main✗) ]
 $ ```python manage.py inspectdb > apptasklistmng/models.py```

**Change** apptasklistmng/models.py by hand. # managed = False. (The FK default reference to PK.)

**change** proj_tasks_list/django_tasklistmng/django_tasklistmng/settings.py INSTALLED_APPS


(vene) proj_tasks_list/django_tasklistmng(main✗) ]
 $```python manage.py migrate```
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK
```

(vene) $ ```python manage.py makemigrations```
```
Migrations for 'apptasklistmng':
  apptasklistmng/migrations/0001_initial.py
    - Create model Users
    - Create model Userloginactivityrecords
    - Create model Userchangerecords
    - Create model Tasks
```

$ ```python manage.py migrate```
```
Operations to perform:
  Apply all migrations: admin, apptasklistmng, auth, contenttypes, sessions
Running migrations:
  Applying apptasklistmng.0001_initial...Traceback (most recent call last):
  File "/Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages/django/db/backends/utils.py", line 82, in _execute
    return self.cursor.execute(sql)
    ...
django.db.utils.OperationalError: (1050, "Table 'users' already exists")
```

 $ ```python manage.py migrate --fake```
```
Operations to perform:
  Apply all migrations: admin, apptasklistmng, auth, contenttypes, sessions
Running migrations:
  Applying apptasklistmng.0001_initial... FAKED
```

**check**

(vene) proj_tasks_list/django_tasklistmng(main✗) ]$ ```python manage.py shell```
```
Python 3.7.2 (v3.7.2:9a3ffc0492, Dec 24 2018, 02:44:43)
[Clang 6.0 (clang-600.0.57)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from apptasklistmng.models import Users
>>> Users.objects.all()
<QuerySet [<Users: Users object (1)>]>
>>> Users.objects.filter(userno=1)
<QuerySet [<Users: Users object (1)>]>
>>> Users.objects.filter(userfirstname="testfirstname")
<QuerySet [<Users: Users object (1)>]>
```


proj_tasks_list/django_tasklistmng(main✗) ]
 $ ```python manage.py createsuperuser```
 ```
Username (leave blank to use 'dyt'): admin
Email address: admin@xample.com
Password:admin
Password (again):admin
The password is too similar to the username.
This password is too short. It must contain at least 8 characters.
This password is too common.
Bypass password validation and create user anyway? [y/N]: y
Superuser created successfully.
```


proj_tasks_list/django_tasklistmng(main✗) ]
$ ```python manage.py runserver```

then **open** browser go to http://127.0.0.1:8000/admin/ and you can login  in with admin/admin


# Add my app tasklistmng

**create** django_tasklistmng/apptasklistmng/templates/apptasklistmng/tasklist.html

**change** django_tasklistmng/apptasklistmng/views.py to point to it
```
def index(request):
    return render(request, 'apptasklistmng/tasklist.html')
```

**change**  django_tasklistmng/apptasklistmng/urls.py
```
app_name = 'apptasklistmng'
```

Then it should recognize things like "app_name:view_name", "apptasklistmng:index"

**add** img/css/js to static/apptasklistmng directory

**correct** their relative path.

Django works with tasklist now  (localstorage version, no database  connect).

## footer/header

**add** component footer.js/header.js in static/apptasklistmng/js/components

## form submit

**Add** *models ```forms.py```* for *submit form element in signin/on.html*. Use them to receive and parse submitted data via form in html.

Like:
```py
class SignInForm(forms.Form):
    usernickname = forms.CharField(label='Username', max_length=100)
    userpwd = forms.CharField(label='Password', max_length=100)
``` 

**Note**: 
- the *```variable name```* must be same as the "*name*" property of *input* element in html/*form* element.
- Make sure the constraints are same among model forms.py, html, database.
- Model fields and Form fields are different. https://docs.djangoproject.com/en/4.0/ref/forms/fields/.

The "action" in form element is the destination. It should be a url match in urls.py and a view in views.py. 
Like: 
```py
# html
<form action="{% url 'apptasklistmng:signinprocess' %}" method="POST">  
</form>

# urls.py
path('signinprocess/', views.signinprocess, name="signinprocess"),

# views.py
def signinprocess(request): 
    if request.method == 'POST':
        form = SignInForm(request.POST)
        if form.is_valid():
            form.cleaned_data
            usernickname = form['usernickname'].value()
            userpwd = form['userpwd'].value()
            return render(request, 'apptasklistmng/userprofile.html', {"usernickname": usernickname, "userpwd": userpwd})
    else:
        form = SignInForm()
        return HttpResponse("hello signin process don't use get ")
```


## url redirect  after form submission

If Don't add it will be ugly like this: 
- http://127.0.0.1:8000/tasklistmng/signinprocess/signin.html
- http://127.0.0.1:8000/tasklistmng/signinprocess/signon.html
- http://127.0.0.1:8000/tasklistmng/signinprocess/tasklist.html
- http://127.0.0.1:8000/tasklistmng/signonprocess/signin.html
- http://127.0.0.1:8000/tasklistmng/signonprocess/signon.html
- http://127.0.0.1:8000/tasklistmng/signonprocess/tasklist.html

**Add** more url pattern and redirect view. Like
```py
path('signin.html', views.signin, name='signin'),
re_path(r'\w*/signin.html$', views.signinLongerUrl, name='signinLonger'),
```

## Connect DB and select, update

After getting submitted data from HTML-FORM element, and using forms.py to read those data into variables, 

use Django Model models.py to select and update with DB.

```py
# connect DB
# select
try:
    user = Users.objects.get(usernickname=usernickname, userpwd=userpwd) # == select * from Users where usernickname=usernickname, userpwd=userpwd
except Users.DoesNotExist:
    return render(request, 'apptasklistmng/signin.html', {"errormsg": "Username or Password Incorrect. Please try again."})            
return render(request, 'apptasklistmng/userprofile.html', {"usernickname": usernickname, "userpwd": userpwd})         

# update
Users.objects.create(userfirstname=userfirstname, usermiddlename=usermiddlename, userlastname=userlastname, 
                usernickname=usernickname, useremail=useremail, 
                usergender=usergender, userpwd=userpwd, userdob=userdob) #  == update Users set column=value where condition
```

## Hashlib
For userpwd we store the hased value instead of origin pwd value. But python hash() generates new hashed value for same input for each session. So don't use it.

Use hashlib.