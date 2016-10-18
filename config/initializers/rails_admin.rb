RailsAdmin.config do |config|
  config.main_app_name = ["logo.svg", "Admin"]
  ### Popular gems integration

  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
  config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show

    # config.excluded_models = ["Organization"]
    config.model 'Organization' do
      visible do
        # controller bindings is available here. Example:
        bindings[:controller].current_user.role == 2
      end
    end

    config.model 'User' do
      visible do
        # controller bindings is available here. Example:
        bindings[:controller].current_user.role == 2
      end
    end

    ActiveRecord::Base.descendants.each do |imodel|
      config.model "#{imodel.name}" do
        list do
          exclude_fields :created_at, :updated_at
        end
      end
    end

  end
end
