<h2>TODO List</h2>

This is a todo list assignment to practice skills for making:

<pre>
  a. package.json scripts
  b. webpack.{common,dev,prod}.js
  c. export and import modules
</pre>

Even though the project/assignment asks for todo's, the
implementation here has named it as 'tasks'. Each tasks
can be assigned to a project, or it could exist alone.
The items suggested and implemented in this project:

<pre>
  1. Title for each todo/task                              [done]
  2. Task assign to Project                                [done]
  3. Description for each task                             [done]
  4. Due date for each task                                [done]
  5. Priority for each task                                [done]
  6. Able to create, read, update and delete tasks         [done]
  7. Display tasks related to a project                    [done]
  8. Display all projects                                  [done]
  9. Display all tasks                                     [done]
  10. Display all completed tasks                          [done]
  11. Display all incomplete tasks                         [done]
  12. Display Unassigned projects                          [done]
  13. Display Unassigned tasks                             [done]
  14. Create, Read and Delete projects                     [done]
  15. Different colors for different priorities            [done]
  16. Different colors for completed and incomplete tasks  [done]
  17. Save data to localStorage                            [done]
  18. Read data from localStorage                          [done]
</pre>

The following is a recap from TOP on how to deploy your application:<br />

1. Make a new branch for your deployment, <br>
   <pre>git branch todo_list_prod</pre>
2. Make sure you have all your work committed, <br>
   <pre>git status</pre>
3. Run,<br />
   <pre>git checkout todo_list_prod && git merge main --no-edit</pre>
4. Now to transpile your work:<br>
   <pre>npx webpack</pre>
   or<br>
   <pre>npm run build</pre>
   because you have all the scripts to do the transpiling in package.json<br>
5. <pre>git add dist -f && git commit -m "Deployment commit"</pre>
6. <pre>>git subtree push --prefix dist origin todo_list_prod</pre>
7. <pre>git checkout main</pre>
