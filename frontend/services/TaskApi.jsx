const TaskApi = {
  // Simulate a server call to fetch task data. Format required:
  // {taskID: number, name: string, description: string, status: string, dueDate: string}
  // Should only return the tasks that are either: 1) not approved, or 2) due date is today or in the future.
  // That is: if a task is due in the past but not yet approved, it should still be included.
  // If a task is due in the future but already approved, it should be included.
  getAllTasks: async () => {
    // Simulate fetching task data from the server.
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Dummy data
    const tasks = [
      {taskID: 1, name: 'Task 1', description: 'A very long description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec magna sit amet odio efficitur convallis non in felis. Etiam mi sem, scelerisque vel turpis in, tempus efficitur sapien. Phasellus maximus ut massa at fermentum. Quisque pulvinar nulla lacus, sit amet sollicitudin velit interdum et. Mauris scelerisque eget metus eget feugiat. Donec consectetur elit eget velit eleifend sodales. Suspendisse molestie pulvinar felis sed commodo. Quisque auctor nisi sem, id molestie nibh consequat vitae. Suspendisse potenti. Sed pretium bibendum mollis. Morbi ornare sagittis diam, sed maximus sapien. Donec id nunc vitae lorem commodo fringilla eget ut odio. Nam pulvinar consequat nisl, a malesuada mi porttitor ac. Vestibulum consequat nisi nunc, sagittis bibendum diam molestie vel. Sed ut elit fringilla ligula consequat eleifend. Suspendisse et dui eu mi pharetra imperdiet ac at est. Aliquam et erat dictum, aliquam nunc at, ullamcorper mi. Pellentesque vitae diam ac dui rhoncus dictum sed vitae quam. Donec vulputate facilisis libero non euismod. Mauris eleifend pellentesque facilisis. Quisque nec dui tristique sapien eleifend suscipit et quis libero. Aliquam iaculis lacus et sapien fermentum aliquam. Sed non ullamcorper nibh. Morbi rhoncus porta diam, ut iaculis lacus rutrum ac. Cras feugiat leo ut ex congue fermentum. Morbi non ante leo. Integer sapien tortor, scelerisque eu lobortis vitae, consequat vitae augue. Proin auctor urna condimentum odio porta, eget condimentum nibh scelerisque. Donec a arcu ac metus molestie blandit id ut lorem. Fusce tincidunt tincidunt venenatis. Sed vel gravida libero. Morbi eu hendrerit massa. Curabitur sed magna interdum, gravida mi at, euismod felis. Integer odio augue, blandit eget orci quis, tempor viverra lorem. Pellentesque dapibus porta ante nec luctus. Nunc porta ex in dignissim tempor. Cras vel nibh metus. Praesent elementum vehicula mi sed interdum. Duis tincidunt enim nulla, in interdum turpis lacinia id. Nullam tincidunt volutpat enim ut pellentesque. Etiam malesuada est sit amet risus malesuada dapibus. Ut fringilla elementum nibh non tincidunt. Nam iaculis turpis elit, sed elementum velit venenatis non. Sed quis augue molestie, bibendum urna id, egestas nibh. Etiam sed euismod dui. Morbi vitae tempus augue. Pellentesque ultrices ut enim ac rhoncus. Vestibulum ut dui imperdiet, blandit enim a, porta est. Sed et euismod quam. Sed semper facilisis augue, sed condimentum libero gravida vitae. Sed non imperdiet nunc. Fusce feugiat felis sodales ex maximus posuere. Praesent eu mollis sapien. Fusce vel tristique leo, ac semper arcu. Etiam imperdiet, tortor sed pulvinar dignissim, purus tortor posuere arcu, eu congue eros est et metus. Donec suscipit vitae libero non volutpat. Aliquam consequat velit sed dolor venenatis, eu venenatis arcu euismod. Donec ac finibus neque. Fusce leo orci, hendrerit at turpis nec, consequat posuere enim. Duis dignissim purus eget massa tempor vestibulum. Donec vitae dignissim turpis, ac scelerisque neque. Sed malesuada hendrerit sem sit amet laoreet. Ut vitae ornare orci.', status: 'Not Submitted', dueDate: 'Feb 19'},
      {taskID: 2, name: 'Task 2', description: 'Description 2..........', status: 'Not Submitted', dueDate: 'Jun 20'},
      {taskID: 3, name: 'Task 3', description: 'Description 3..........', status: 'Waiting Approval', dueDate: 'Jun 21'},
      {taskID: 4, name: 'Task 4', description: 'Description 4..........', status: 'Approved', dueDate: 'Jun 22'},
      {taskID: 5, name: 'Task 5', description: 'Description 5..........', status: 'Rejected', dueDate: 'Jun 23'},
      {taskID: 6, name: 'Task 6', description: 'Description 6..........', status: 'Not Submitted', dueDate: 'Jun 24'},
      {taskID: 7, name: 'Task 7', description: 'Description 7..........', status: 'Not Submitted', dueDate: 'Jun 25'},
      {taskID: 8, name: 'Task 8', description: 'Description 8..........', status: 'Not Submitted', dueDate: 'Jun 26'},
      {taskID: 9, name: 'Task 9', description: 'Description 9..........', status: 'Not Submitted', dueDate: 'Jun 27'},
      {taskID: 10, name: 'Task 10', description: 'Description 10..........', status: 'Not Submitted', dueDate: 'Jun 28'},
    ];
    return tasks;
  },
  
  uploadEvidence: async (taskID, evidence) => {
    // Simulate uploading evidence to the server.
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dummy response
    console.log(`Evidence for task ${taskID} uploaded:`, evidence);
    // randomly success or fail the upload, you should see different output in the frontend
    // (remove this when the actual API is implemented)
    if (Math.random() > 0.5){
      return { success: true, message: 'Evidence uploaded successfully!' };
    } else {
      return { success: false, message: 'Failed to upload evidence. Please try again.' };
    }
  },

  getTaskEvidence: async (taskID) => {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy evidence data
    const evidence = 'This is a dummy evidence for task ' + taskID + '. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat nec magna eu hendrerit. Nulla sed pretium ex, sit amet finibus dolor. Phasellus ante turpis, tincidunt sodales semper id, dignissim quis felis. Ut eu commodo urna, nec maximus ex. Fusce laoreet commodo auctor. Vivamus mi nisl, sollicitudin sit amet pulvinar a, venenatis nec nulla. Suspendisse ornare vulputate vehicula. Nulla blandit facilisis magna vel commodo. Fusce pretium facilisis tortor nec vestibulum. Donec vitae mattis nunc. Nam ante dolor, consectetur non nisi sed, posuere lacinia ante. Aenean auctor sed dui ut mattis. Nulla dui urna, cursus vel ante at, interdum aliquet enim. Vestibulum efficitur elementum pharetra. Fusce bibendum porta turpis vitae euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis at nulla ullamcorper, dignissim nibh et, placerat magna. Aliquam a blandit orci, a volutpat diam. Duis fermentum nisl erat, et tempor tellus vehicula eget. Aenean eu semper turpis. Sed vel euismod sem, in aliquet odio. Quisque sed odio aliquam, accumsan lectus nec, consectetur lorem. Proin semper risus ut nisi vulputate, vitae pulvinar lectus auctor.';

    return evidence;
  },

  getTaskComments: async (taskID) => {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy comments data
    const comment = 'This is a dummy comment for task ' + taskID + '. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat nec magna eu hendrerit. Nulla sed pretium ex, sit amet finibus dolor. Phasellus ante turpis, tincidunt sodales semper id, dignissim quis felis. Ut eu commodo urna, nec maximus ex. Fusce laoreet commodo auctor. Vivamus mi nisl, sollicitudin sit amet pulvinar a, venenatis nec nulla. Suspendisse ornare vulputate vehicula. Nulla blandit facilisis magna vel commodo. Fusce pretium facilisis tortor nec vestibulum. Donec vitae mattis nunc. Nam ante dolor, consectetur non nisi sed, posuere lacinia ante. Aenean auctor sed dui ut mattis. Nulla dui urna, cursus vel ante at, interdum aliquet enim. Vestibulum efficitur elementum pharetra. Fusce bibendum porta turpis vitae euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis at nulla ullamcorper, dignissim nibh et, placerat magna. Aliquam a blandit orci, a volutpat diam. Duis fermentum nisl erat, et tempor tellus vehicula eget. Aenean eu semper turpis. Sed vel euismod sem, in aliquet odio. Quisque sed odio aliquam, accumsan lectus nec, consectetur lorem.';

    return comment;
  }
}

export default TaskApi; 