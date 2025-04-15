const AdminAPI = {
    // Fetch all tasks that need administrator approval
    // Return format is an array of objects, each containing:
    // - taskID (number): Unique identifier for the task
    // - taskName (string): Name of the task
    // - submissionDate (string): Date when task was submitted
    // - studentName (string): Name of student who submitted
    // - legacyName (string): Legacy the student belongs to
    // - evidence (string): Text/URL evidence submitted by student
    // - points (number): Points awarded for task completion
    // - status (string): Current task status ('Needs Approval', 'Approved', 'Not Submitted')
    getPendingTasks: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Dummy data
      const pendingTasks = [
        {taskID: 1, taskName: 'Task 1', submissionDate: '2023/05/15', studentName: 'Alice Chen', legacyName: 'Vista', evidence: 'This is evidence for Task 1. The student visited the museum and completed all required activities.', points: 10, status: 'Needs Approval'},
        {taskID: 3, taskName: 'Task 3', submissionDate: '2023/05/16', studentName: 'Bob Johnson', legacyName: 'Tower', evidence: 'For Task 3, the student submitted a video presentation and feedback from participants.', points: 15, status: 'Needs Approval'},
        {taskID: 5, taskName: 'Task 5', submissionDate: '2023/05/17', studentName: 'Carlos Rodriguez', legacyName: 'Bridge', evidence: 'The student\'s Task 5 submission includes reflections on the learning experience.', points: 20, status: 'Needs Approval'},
        {taskID: 8, taskName: 'Task 8', submissionDate: '2023/05/18', studentName: 'Diana Kim', legacyName: 'Chronicle', evidence: 'Evidence for Task 8 includes a written report and photos from the event.', points: 10, status: 'Needs Approval'},
        {taskID: 9, taskName: 'Task 9', submissionDate: '2023/05/18', studentName: 'Elijah Williams', legacyName: 'Vista', evidence: 'Task 9 evidence contains documentation of the community service hours.', points: 25, status: 'Needs Approval'},
      ];
      
      return pendingTasks;
    },
    
    // Create a new task that will be visible to students
    // Parameters:
    // - taskName (string): Name of the task
    // - description (string): Detailed description of the task
    // - dueDate (string): Deadline for the task
    // - targetCity (string, optional): City this task is specific to (null for all cities)
    // - points (number): Points awarded for completion
    // Returns: Object with the created task information and success status
    createTask: async (taskName, description, dueDate, targetCity = null, points) => {
      // Validate inputs
      if (!taskName || !description || !dueDate || !points) {
        return { success: false, message: 'Missing required task information' };
      }
      
      // Validate points is a number greater than 0
      if (isNaN(points) || points <= 0) {
        return { success: false, message: 'Points must be a positive number' };
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful task creation
      const newTask = {
        taskID: Math.floor(Math.random() * 1000) + 100, // Generate dummy ID
        taskName,
        description,
        dueDate,
        targetCity,
        points: Number(points),
        createdAt: new Date().toISOString(),
        status: 'Not Submitted' // Initial status for a new task
      };
      
      return { 
        success: true, 
        message: 'Task created successfully',
        task: newTask
      };
    },
    
    // Approve a task submission from a student
    // Parameters:
    // - taskID (number): ID of the task to approve
    // - feedback (string, optional): Feedback to provide to the student
    // Returns: Object with success status and message
    approveTask: async (taskID, feedback = '') => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log(`Approving task ${taskID} with feedback: ${feedback}`);
      
      // Simulate random success/failure for testing UI handling
      const isSuccessful = Math.random() > 0.1; // 90% success rate
      
      if (isSuccessful) {
        return { 
          success: true, 
          message: 'Task approved successfully',
          taskID,
          newStatus: 'Approved'
        };
      } else {
        return {
          success: false,
          message: 'Error approving task: Database connection failed',
          taskID
        };
      }
    },
    
    // Reject a task submission from a student
    // Parameters:
    // - taskID (number): ID of the task to reject
    // - reason (string): Reason for rejection (required)
    // Returns: Object with success status and message
    rejectTask: async (taskID, reason) => {
      // Validate inputs
      if (!reason) {
        return { success: false, message: 'Rejection reason is required' };
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log(`Rejecting task ${taskID} with reason: ${reason}`);
      
      return { 
        success: true, 
        message: 'Task rejected successfully',
        taskID,
        // After rejection, the task returns to "Not Submitted" state
        newStatus: 'Not Submitted'
      };
    },
    
    // Get all active tasks (for admin review)
    // Returns: Array of all active tasks
    // Optional parameters:
    // - legacyFilter (string): Filter by legacy name
    // - statusFilter (string): Filter by task status
    getAllTasks: async (legacyFilter = 'All', statusFilter = 'All') => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Dummy task data
      let tasks = [
        {taskID: 1, taskName: 'Task 1', description: 'Description 1', dueDate: '2023/06/15', targetCity: null, points: 10, status: 'Needs Approval', completions: 12, legacyName: 'Vista'},
        {taskID: 2, taskName: 'Task 2', description: 'Description 2', dueDate: '2023/06/20', targetCity: 'San Francisco', points: 15, status: 'Approved', completions: 5, legacyName: 'Tower'},
        {taskID: 3, taskName: 'Task 3', description: 'Description 3', dueDate: '2023/06/25', targetCity: null, points: 20, status: 'Needs Approval', completions: 8, legacyName: 'Bridge'},
        {taskID: 4, taskName: 'Task 4', description: 'Description 4', dueDate: '2023/05/10', targetCity: 'Berlin', points: 10, status: 'Approved', completions: 3, legacyName: 'Chronicle'},
        {taskID: 5, taskName: 'Task 5', description: 'Description 5', dueDate: '2023/07/05', targetCity: null, points: 25, status: 'Needs Approval', completions: 0, legacyName: 'Vista'},
        {taskID: 6, taskName: 'Task 6', description: 'Description 6', dueDate: '2023/07/15', targetCity: null, points: 15, status: 'Approved', completions: 7, legacyName: 'Pulse'},
        {taskID: 7, taskName: 'Task 7', description: 'Description 7', dueDate: '2023/07/20', targetCity: 'Tokyo', points: 20, status: 'Not Submitted', completions: 0, legacyName: 'Tower'},
      ];
      
      // Apply filters if needed
      if (legacyFilter !== 'All') {
        tasks = tasks.filter(task => task.legacyName === legacyFilter);
      }
      
      if (statusFilter !== 'All') {
        tasks = tasks.filter(task => task.status === statusFilter);
      }
      
      return tasks;
    },
    
    // Get folder link for a legacy group
    // Parameters:
    // - legacyName (string): Name of the legacy group
    // Returns: URL string for the folder
    getLegacyFolderLink: async (legacyName) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Dummy folder links for each legacy group
      const folderLinks = {
        'Vista': 'https://drive.google.com/drive/folders/vista-legacy-folder',
        'Tower': 'https://drive.google.com/drive/folders/tower-legacy-folder',
        'Bridge': 'https://drive.google.com/drive/folders/bridge-legacy-folder',
        'Chronicle': 'https://drive.google.com/drive/folders/chronicle-legacy-folder',
        'Pulse': 'https://drive.google.com/drive/folders/pulse-legacy-folder',
      };
      
      return folderLinks[legacyName] || 'https://drive.google.com/drive/folders/default-folder';
    }
  };
  
  export default AdminAPI;