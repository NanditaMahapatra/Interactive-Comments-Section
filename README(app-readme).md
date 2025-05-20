# Hello Everyone!
# Notes for the interactive comments section --- 

1. Component Structure - {

    1. Step Counter Component (to keep scores)
    2. Comments component (to display comments)
    3. Actual Comment div component to display for the logged in user
    4. info component to show the user info (added to increase usability as it will be used for all the comments and replies as well as for the logged in user)
    5. replies component which will be done reusing the comments component enclosed in a div with every level giving a left margin and border
}
2. Delete and you tag for the logged in user
3. edit and reply buttons
4. Entire application = Scrollable div to show pre-loaded comments + Actual logged in user's comment component
5. Update the data.json to keep a track of the updated state
6. Redux?? for centralized state??? 
7. Redux state --- {

    1. initial state - {
        currentUser : {
            userName : "",
            image : {
                png : "",
                webp : ""
            }
        },
        comments : []    //if comments is 0 show 'What are your thoughts?'     
    }
    2. app load : api call to mimic data from backend
    3. using redux toolkit : {
        - creating actions through createActions 
        - creating reducers through toolkit? not required as only one reducer
    }
}
8. Current Status log : {
    
    - Making the step counter component and see how it looks keeping a local state for now (`25-04-2025 17:35`)
}