import { Stories } from '../model/story.model';
import { Tasks } from '../model/task.model';
import { ATTR_STORY_UUID } from './constants';

/**
 * Closes the task, when finished
 * **params**
 * taskObject: task object to close
 */
export async function taskWorker(taskObject) {
	return new Promise( () => {
		setTimeout( async() => {
			const taskToUpdate = await Tasks.findOne({ where: { UUID: taskObject.UUID } });
			await taskToUpdate?.update({ Status: "Close" });
			await taskToUpdate?.save();
		}, taskObject.Estimate * 1000);
	});
}

/**
 * Closes the story, when finished
 * **params**
 * storyObject: story object to close
 */
export async function storyWorker(storyObject) {
	return new Promise( async () => {
		const storyWorkerInterval = setInterval( async() => {
			const taskArray = await Tasks.findAll({
				where: {
					[ATTR_STORY_UUID]: storyObject.UUID
				}
			});
			if (taskArray.length > 0) {
				let result: boolean = taskArray.every((task) => {
					return task.Status === 'Close'
				});
				if ( result === true) {
					const storyToUpdate = await Stories.findOne({ where: { UUID: storyObject.UUID } });
					await storyToUpdate?.update({ Status: "Close" });
					await storyToUpdate?.save();
					clearInterval(storyWorkerInterval);
				}
			}
		}, 1000);
	});
}