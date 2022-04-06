from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from .models import Users, Userchangerecords, Userloginactivityrecords, Tasks
from .forms import SignInForm, SignOnForm

# Create your views here.


def index(request):
    return render(request, 'apptasklistmng/tasklist.html')
def indexLongerUrl(request):
    return redirect('apptasklistmng:index')

def signon(request):
    return render(request, 'apptasklistmng/signon.html')
def signonLongerUrl(request):
    return redirect('apptasklistmng:signon')


def signin(request):
    return render(request, 'apptasklistmng/signin.html')
def signinLongerUrl(request):
    return redirect('apptasklistmng:signin')


def signinprocess(request): #, usernickname, userpwd):
    # return HttpResponseRedirect(reverse('apptasklistmng:userprofile', args=(usernickname,userpwd,)))
    
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = SignInForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            form.cleaned_data
            print("form1: ", form)
            usernickname = form['usernickname'].value()
            userpwd = form['userpwd'].value()
            print("form1 usernickname value: ", usernickname)
            print("form1 userpwd value: ", userpwd)

            # redirect to a new URL:
            # return HttpResponseRedirect("userprofile/")
            return render(request, 'apptasklistmng/userprofile.html', {"usernickname": usernickname, "userpwd": userpwd})

    # if a GET (or any other method) we'll create a blank form
    else:
        form = SignInForm()
        return HttpResponse("hello signin process don't use get ")
    
def signonprocess(request):
    if request.method == 'POST':
        form = SignOnForm(request.POST)
        if form.is_valid():
            form.cleaned_data 
            userfirstname = form["userfirstname"].value()
            usermiddlename = form["usermiddlename"].value()
            userlastname = form["userlastname"].value()
            useremail = form["useremail"].value()
            userdob = form["userdob"].value()
            usergender = form["usergender"].value()
            usernickname = form["usernickname"].value()
            userpwd = form["userpwd"].value()
            print("usernickname: ", usernickname)
            print("userlastname: ", userlastname)
            print("userfirstname: ", userfirstname)
            print("usermiddlename: ", usermiddlename)
            print("useremail: ", useremail)
            print("usedob: ", userdob)
            print("usergender: ", usergender)
            print("userpwd: ", userpwd)
            return render(request, "apptasklistmng/userprofile.html", {"usernickname": usernickname, "userpwd": userpwd, "userlastname: ": userlastname, "userfirstname: ": userfirstname,"usermiddlename: ": usermiddlename, "useremail: ": useremail,"usedob: ": userdob, "usergender: ":usergender })
        return HttpResponse("hello signon process invalid")
    else:
        return HttpResponse("hello signon process don't use get")
    
# def userprofile(request):
#     return HttpResponse("userprofile page")