// test/TaskList.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@nuxt/test-utils/runtime'
import TaskList from '~~/app/components/Task-List.vue'

// Mock your composable so no real API calls happen
vi.mock('~/composables/UseTask', () => {
    return {
        UseTask: () => ({
            tasks: [
                { _id: '1', text: 'Buy milk' },
                { _id: '2', text: 'Clean desk' }
            ],
            newTask: '',
            addTask: vi.fn(),
            removeTask: vi.fn(),
            updateTask: vi.fn(),
        })
    }
})

describe('TaskList.vue', () => {
    it('renders tasks', async () => {
        const wrapper = await mount(TaskList, {
            props: { listId: 'abc123' }
        })

        expect(wrapper.text()).toContain('Buy milk')
        expect(wrapper.text()).toContain('Clean desk')
    })

    it('calls addTask when clicking Add', async () => {
        const wrapper = await mount(TaskList, {
            props: { listId: 'abc123' }
        })

        const button = wrapper.find('button')
        await button.trigger('click')

        // retrieve mocked composable
        const { UseTask } = await import('~/composables/UseTask')
        expect(UseTask().addTask).toHaveBeenCalled()
    })
})
