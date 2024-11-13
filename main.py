from kivy.lang import Builder
from kivy.core.window import Window
from kivy.uix.screenmanager import ScreenManager, Screen
from kivymd.app import MDApp
from kivymd.uix.label import MDLabel
from kivymd.uix.list import MDList

# Screen management
class HomeScreen(Screen):
    pass

class StoryScreen(Screen):
    pass

# Screen Manager to switch between screens
sm = ScreenManager()
sm.add_widget(HomeScreen(name='home'))
sm.add_widget(StoryScreen(name='story'))

class ReadingApp(MDApp):
    def build(self):
        self.title = "Reading App"
        self.story_data = {
            "Story 1": "This is the content of Story 1...",
            "Story 2": "This is the content of Story 2..."}
        Window.size = (350, 600)  # Mobile-like window size for testing
        return Builder.load_file('ui.kv')
    
    def load_story(self, story_name):
        story_screen = self.root.get_screen('story')
        story_screen.ids.story_content.text = self.story_data.get(story_name, "Story not found")
        story_screen.ids.toolbar.title = story_name
        self.root.current = 'story'

    def go_back_home(self):
        self.root.current = 'home'

if __name__ == "__main__":
    ReadingApp().run()
