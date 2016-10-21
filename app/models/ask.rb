class Ask < ActiveRecord::Base
  validates :description, presence: true
  belongs_to :objective, touch: true
  belongs_to :outcome, touch: true
  # belongs_to :actor
  #has_and_belongs_to_many :activities
  has_and_belongs_to_many :actors
  has_many :messages, dependent: :destroy
  has_one :indicator, dependent: :destroy

  def cache_key
    [super, Apartment::Tenant.current].join("/")
  end

  def cached_indicator
    Rails.cache.fetch([self, 'indicator']) { self.indicator }
  end
end
