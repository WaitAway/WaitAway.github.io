import random

def location(network,common):
    '''
    (2D list,int)->int
    This method returns the index to which user is found in the "database" of users
    Preconditions: Method will return -1 if the user is not found for premilinary reasons
    so that it won't crash and will go the else 
    '''
    #will return -1 if the index has not been found
    index = -1 
    for i in range(len(network)):
        if  network[i] == common:
            index = i

    return index

def location_2D(network,common):
    '''
    (2D list,int)->int
    This method returns the index to which user is found in the "database" of users
    Preconditions: Method will return -1 if the user is not found for premilinary reasons
    so that it won't crash and will go the else 
    '''
    index = -1 
    for i in range(len(network)):
        if  network[i][0] == common:
            index = i

    return index 
        
        
    

def create_network(file_name):
    '''(str)->list of tuples where each tuple has 2 elements the first is int and the second is list of int

    Precondition: file_name has data on social netowrk. In particular:
    The first line in the file contains the number of users in the social network
    Each line that follows has two numbers. The first is a user ID (int) in the social network,
    the second is the ID of his/her friend.
    The friendship is only listed once with the user ID always being smaller than friend ID.
    For example, if 7 and 50 are friends there is a line in the file with 7 50 entry, but there is line 50 7.
    There is no user without a friend
    Users sorted by ID, friends of each user are sorted by ID
    Returns the 2D list representing the frendship nework as described above
    where the network is sorted by the ID and each list of int (in a tuple) is sorted (i.e. each list of friens is sorted).
    '''
    friends = open(file_name).read().splitlines()
    network=[]
    #removing the first line to read
    friends.pop(0)
    
    new_list = [] 

    

    for pairs in friends:
        #We will need to split the list into pairs
        pairs = pairs.split(" ")

        #We know that user is at 0 index 
        user = int(pairs[0].strip())

        
        #We know that friends is at 1 index
        common = int(pairs[1].strip())

        new_list.append( (user,[common]) )

        #list of all left users
        user_left_list = [i[0] for i in network]
       


        #In this iteration I       

        #Find the index to which user is in the user_list append 
        if user in user_left_list:
            
            local = location(user_left_list,user)
            network[local][1].append(common)
    
        else:
            network.append( (user,[common]) )



        ####################################################
     
        
        if common in user_left_list:
            #local is finding the index to which common is contained in user_left_list   
            local = location(user_left_list,common)
            #insert user in the tuple ( x , [2,4,5,6,])
            network[local][1].append(user)
        else:
            network.append( (common,[user]) )
            
        
        ####################################################
            
    #in our case we'll need to sort the list, in turn providing the list in chronilogical order 
    network.sort()
        
        
    
    return network

def getCommonFriends(user1, user2, network):
    '''(int, int, 2D list) ->list
    Precondition: user1 and user2 IDs in the network. 2D list sorted by the IDs, 
    and friends of user 1 and user 2 sorted 
    Given a 2D-list for friendship network, returns the sorted list of common friends of user1 and user2
    '''
    # YOUR CODE GOES HERE

    #In my other function I could not call location since I needed to evaluate a
    #2d List in my case it caused conflict since I called my location function before
    #assesing network as a 2D list. I just simply remade the 
    index1 = location_2D(network,user1)
    index2 = location_2D(network,user2)

    #Finds the location of user1 in the network with his friends
    List1 = network[index1][1]
    #Finds the location of user2 in the network with his friends 
    List2 = network[index2][1]
    common=[]
    if len(List1) >= len(List2): #O(1)
        for i in range(len(List1)): #O(n)
            for j in range(len(List2)): #O(n)
                if List1[i] == List2[j]: #O(1).
                    common.append(List1[i])
    else:
        for i in range(len(List2)):
            for j in range(len(List1)):
                if List2[i] == List1[j]:
                    common.append(List2[i])
        
 
    return common

    
def recommend(user, network):
    '''(int, 2Dlist)->int or None
    Given a 2D-list for friendship network, returns None if there is no other person
    who has at least one neighbour in common with the given user and who the user does
    not know already.
    
    Otherwise it returns the ID of the recommended friend. A recommended friend is a person
    you are not already friends with and with whom you have the most friends in common in the whole network.
    If there is more than one person with whom you have the maximum number of friends in common
    return the one with the smallest ID. '''

    # YOUR CODE GOES HERE
    other_list = []
    person = None 
    recommend = None
    counter =0 
    max_friends = 0
    index_of_user2 = None
    
    #Checks if person enters a user that is not in list 
    user_list = location_2D(network,user)
    if user_list == -1: return None
    ####################################################
    
    for i in range(len(network)):
        #Getting all commong friends except with user himself that is why i put the if statement 
        if network[i][0] != user:
            other_list = getCommonFriends(user, network[i][0], network)
            #Checking if user not in the list of friends from other users
            if network[user_list][0] not in network[i][1]:
                #Checking if the user we inputed has more then 1 friend
                if len(other_list) > 0:
                    #Checking for the max amount of friends
                    if len(other_list) > max_friends:
                        #initilazing the max amount
                        max_friends = len(other_list)
                        #returning the person to which has the max amount of friends in common
                        person = network[i][0]
        
                
    return person
            
def k_or_more_friends(network, k):
    '''(2Dlist,int)->int
    Given a 2D-list for friendship network and non-negative integer k,
    returns the number of users who have at least k friends in the network
    Precondition: k is non-negative'''
    # YOUR CODE GOES HERE
    count = 0 
    for i in range(len(network)):
        list1 = network[i][1]
        if len(list1) >=k:
            count+=1
    return count


def maximum_num_friends(network):
    '''(2Dlist)->int
    Given a 2D-list for friendship network,
    returns the maximum number of friends any user in the network has.
    '''
    max1 = 0
    for i in range(len(network)):
        list1 = network[i][1]
        if len(list1)>= max1:
            max1 = len(list1)

    return max1
    

def people_with_most_friends(network):
    '''(2Dlist)->1D list
    Given a 2D-list for friendship network, returns a list of people (IDs) who have the most friends in network.'''
    max_friends=[]
    checker = maximum_num_friends(network)
    # YOUR CODE GOES HERE
    for i in range(len(network)):
        list1 = network[i][1]
        if len(list1) == checker:
            max_friends.append(network[i][0])
    return max_friends


def average_num_friends(network):
    '''(2Dlist)->number
    Returns an average number of friends overs all users in the network'''

    # YOUR CODE GOES HERE
    avg = 0
    for i in range(len(network)):
        list1 = network[i][1]
        avg += len(list1)

    return avg/len(network)
    

def knows_everyone(network):
    '''(2Dlist)->bool
    Given a 2D-list for friendship network,
    returns True if there is a user in the network who knows everyone
    and False otherwise'''
    
    # YOUR CODE GOES HERE
    for i in range(len(network)):
        list1 = network[i][1]
        if len(list1) == len(network)-1:
            return True
    return False
        


####### CHATTING WITH USER CODE:

def is_valid_file_name():
    '''None->str or None'''
    file_name = None
    try:
        file_name=input("Enter the name of the file: ").strip()
        f=open(file_name)
        f.close()
    except FileNotFoundError:
        print("There is no file with that name. Try again.")
        file_name=None
    return file_name 

def get_file_name():
    '''()->str
    Keeps on asking for a file name that exists in the current folder,
    until it succeeds in getting a valid file name.
    Once it succeeds, it returns a string containing that file name'''
    file_name=None
    while file_name==None:
        file_name=is_valid_file_name()
    return file_name


def get_uid(network):
    '''(2Dlist)->int
    Keeps on asking for a user ID that exists in the network
    until it succeeds. Then it returns it'''

    # YOUR CODE GOES HERE
    user = None
    while True and type(user) != int or location_2D(network,user) == -1:
        try:
            user = int(input("Enter an integer for a user ID: "))
            if location_2D(network,user) == -1:
                print("That user ID does not exist. Try again.")
        except ValueError:
            print("That was not an integer. Please try again. ")

    return int(user)
    

##############################
# main
##############################

# NOTHING FOLLOWING THIS LINE CAN BE REMOVED or MODIFIED


file_name=get_file_name()
    
net=create_network(file_name)

print("\nFirst general statistics about the social network:\n")

print("This social network has", len(net), "people/users.")
print("In this social network the maximum number of friends that any one person has is "+str(maximum_num_friends(net))+".")
print("The average number of friends is "+str(average_num_friends(net))+".")
mf=people_with_most_friends(net)
print("There are", len(mf), "people with "+str(maximum_num_friends(net))+" friends and here are their IDs:", end=" ")
for item in mf:
    print(item, end=" ")

print("\n\nI now pick a number at random.", end=" ")
k=random.randint(0,len(net)//4)
print("\nThat number is: "+str(k)+". Let's see how many people has that many friends.")
print("There is", k_or_more_friends(net,k), "people with", k, "or more friends")

if knows_everyone(net):
    print("\nThere at least one person that knows everyone.")
else:
    print("\nThere is nobody that knows everyone.")

print("\nWe are now ready to recommend a friend for a user you specify.")
uid=get_uid(net)
rec=recommend(uid, net)
if rec==None:
    print("We have nobody to recommend for user with ID", uid, "since he/she is dominating in their connected component")
else:
    print("For user with ID", uid,"we recommend the user with ID",rec)
    print("That is because users", uid, "and",rec, "have", len(getCommonFriends(uid,rec,net)), "common friends and")
    print("user", uid, "does not have more common friends with anyone else.")
        

print("\nFinally, you showed interest in knowing common friends of some pairs of users.")
print("About 1st user ...")
uid1=get_uid(net)
print("About 2st user ...")
uid2=get_uid(net)
print("Here is the list of common friends of", uid1, "and", uid2)
common=getCommonFriends(uid1,uid2,net)
for item in common:
    print(item, end=" ")


    
