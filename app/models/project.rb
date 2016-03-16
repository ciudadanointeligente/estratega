class Project < ActiveRecord::Base
  has_many :resources, dependent: :destroy
  has_many :objectives, dependent: :destroy
  has_one :real_problem, dependent: :destroy
  has_many :users, through: :permissions
  has_many :permissions, dependent: :destroy
  has_many :activities, dependent: :destroy

  validates :title, presence: true

  # def activities
  #   @activities = []
  #   self.objectives.each do |objective|
  #     objective.activities.each do |activity|
  #       @activities << activity
  #     end
  #   end
  #   return @activities
  # end
  
  def as_ical
    cal = Icalendar::Calendar.new
    self.activities.each do |a|
      if !a.scheduling.blank?
        event = Icalendar::Event.new
        event.dtstart = a.scheduling
        event.summary = a.title
        event.description = a.description
        cal.add_event(event)
      end
    end
    cal.publish
    return cal.to_ical
  end
  
end
