example usage of taskService (Works equivalently for users and categories):

```
import {TaskService} from './task.service';
....
constructor (taskService: TaskService){ }
...
    this.taskService.getAllTasks('cebr76').then(r => console.log(r));
    ...
    let newTask: Task = {
        id: 2,
        title: ' (╯°□°）╯︵ ┻━┻ '
        ....
        };
    this.taskService.addTask('cebr76', newTask)
        .then(success => ...);
```

