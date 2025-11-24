---
title: Vuedo2.0
author: C. Gibson
date: <2025-11-12 Wed>
description: Vuedo2.0 is a reconstruction of Vuedo1.0 built with Nuxt4
---

# Vuedo2.0

![Static Badge](https://img.shields.io/badge/node-0?link=https%3A%2F%2Fnodejs.org%2F)
![Static Badge](https://img.shields.io/badge/pnpm-0)
![Static Badge](https://img.shields.io/badge/nuxt-0)
![Static Badge](https://img.shields.io/badge/mongoDB-0)

Vuedo2.0 is a reconstruction of vuedo1.0 built with Nuxt4

# Table of Contents

1.  [Get Started](#org64b8bc2)
    1.  [install dependencies:](#org56c09f1)
    2.  [Start Development server](#org0b37764)
    3.  [Production](#org5664970)
    4.  [MICE](#org6c4326c)
2.  [NOTE](#orge81d0d8)


<a id="org64b8bc2"></a>

## Get Started

Read Notes for dependincy issues


<a id="org56c09f1"></a>

### install dependencies:

``` bash
    pnpm install
```


<a id="org0b37764"></a>

### Start Development server

Server defaults to \`<http://localhost:3000>\`

```bash
    pnpm run dev
```


<a id="org5664970"></a>

### Production

1.  Build application:

```bash        
  pnpm run build
```

2.  Preview Build:

```bash        
  pnpm run preview
```

<a id="org6c4326c"></a>

### Seed
    
to seed random data:
    
```bash        
    pnpm run seed <amount> 
```


<a id="orge81d0d8"></a>

## NOTE

### h3 post request issue
In Nuxt 4 the installed h3 can be an incompatible version. To pin h3 add this to **package.json**
```json
        "dependencies": {
            "h3": "1.15.4"
        },
        "pnpm": {
            "overrides": {
              "h3": "1.15.4"
            }
          }
```
and reinstall `pnpm install`

## API routs (server/api)
All endpoints are server/api/* for Nuxt 4 server routes.
- GET /api/lists
  Returns all lists (name, id, task ids).

- GET /api/tasks
  Returns all tasks. If ?list=<listId> is provided, returns tasks matching that list id.

- POST /api/lists
  Create a new list. Body: { "name": "foo" }. Creates an empty tasks array for the list.

- POST /api/lists/:id/tasks
  Create a new task under a parent list. URL: /api/lists/<listId>/tasks Body: { "text": "foo" }.

- PUT /api/tasks/:id
  Update a task (e.g., toggle checked). URL: /api/tasks/<taskId> Body: { "checked": true } (or partial fields).

- DELETE /api/lists/:id/tasks/:taskId
  Delete a task (removes from tasks collection and from parent list).

- DELETE /api/lists/:id
  Delete a list. TODO: delete child tasks before deleting list (or refuse if tasks exist).
### Example curl request
```bash 
# create list
curl -X POST http://localhost:3000/api/lists -H "Content-Type: application/json" -d '{"name":"Groceries"}'

# get lists
curl http://localhost:3000/api/lists

# create task in list
curl -X POST http://localhost:3000/api/lists/<LIST_ID>/tasks \
  -H "Content-Type: application/json" -d '{"text":"Buy milk"}'

# get tasks (all)
curl http://localhost:3000/api/tasks

# get tasks for list
curl "http://localhost:3000/api/tasks?list=<LIST_ID>"

# update task (toggle checked)
curl -X PUT http://localhost:3000/api/tasks/<TASK_ID> \
  -H "Content-Type: application/json" -d '{"checked": true}'

# delete task
curl -X DELETE http://localhost:3000/api/lists/<LIST_ID>/tasks/<TASK_ID>

# delete list
curl -X DELETE http://localhost:3000/api/lists/<LIST_ID>
```
## TODO Main [1/7]
- [X] Crud functionality for tasks
- [ ] modify ui
- [-] add lists [4/5]
    - [X] make list schema
    - [X] connect tasks to list
    - [X] add lists to seed script
    - [X] routing [5/5]
        - [X] get
        - [X] post [2/2]
            - [X] post list
            - [X] post task to list
        - [X] delete
            - [X] delete task from list
            - [X] delete list
        - [X] push
        - [X] add list/id.get
    - [-] render lists on web page
        - [X] FIX :: hydration issue
        - [ ] add add list
        - [ ] add delete list
        - [ ] fix add task
        - [ ] fix put task
        - [X] fix delete task
- [ ] add testing
- [ ] add sub tasks
- [ ] add time stamps
- [ ] add a today lists
- [ ] add memos
## - TODO [ ] Postman [2/3]
- [X] prerequest to enter list name:
  made env
- [X] prerequest to inter task name:
  made env
- [ ] respond with lists
## - TODO [ ] Docs [0/3]
Directories
- [-] server
    - [-] api
        - [X] lists
            - [X] get
            - [X] post
            - [X] delete
        - [X] tasks
            - [X] get
            - [X] post
            - [X] delete
            - [X] put
        - [ ] debug
    - [ ] moduels
        - [ ] lists
        - [ ] tasks
    - [ ] utils/db
- [ ] scripts
    - [ ] init.sh
    - [ ] seed.js
- [ ] app
    - [ ] components
        - [ ] add task
        - [ ] list view
        - [ ] task list
    - [ ] composables/useTask
    - [ ] pages/index
