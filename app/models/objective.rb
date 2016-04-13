class Objective < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :project
  has_and_belongs_to_many :solutions
  has_and_belongs_to_many :actors
  has_many :outcomes
  has_many :activities, dependent: :destroy
  has_many :asks, dependent: :destroy
  has_one :indicator, dependent: :destroy

  def objective_type_list
    return I18n.t "projects.objective_modal.objective_type_list"
  end

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