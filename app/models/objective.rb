class Objective < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :project
  has_and_belongs_to_many :solutions
  has_and_belongs_to_many :actors
  has_many :outcomes
  has_many :activities, dependent: :destroy
  has_many :asks, dependent: :destroy

  def objective_type_list
    objective_type = ["Desarrollo de políticas públicas","Establecimiento de un tema en la agenda política","Adopción de políticas públicas","Bloqueo de políticas públicas","Implementación de políticas públicas","Mantenimiento de políticas públicas", "Otros"]
    return objective_type
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