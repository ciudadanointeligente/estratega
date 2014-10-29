class OtherNamesController < ApplicationController
  before_action :set_other_name, only: [:show, :edit, :update, :destroy]

  # GET /other_names
  # GET /other_names.json
  def index
    @other_names = OtherName.all
  end

  # GET /other_names/1
  # GET /other_names/1.json
  def show
  end

  # GET /other_names/new
  def new
    @other_name = OtherName.new
  end

  # GET /other_names/1/edit
  def edit
  end

  # POST /other_names
  # POST /other_names.json
  def create
    @other_name = OtherName.new(other_name_params)

    respond_to do |format|
      if @other_name.save
        format.html { redirect_to @other_name, notice: 'Other name was successfully created.' }
        format.json { render :show, status: :created, location: @other_name }
      else
        format.html { render :new }
        format.json { render json: @other_name.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /other_names/1
  # PATCH/PUT /other_names/1.json
  def update
    respond_to do |format|
      if @other_name.update(other_name_params)
        format.html { redirect_to @other_name, notice: 'Other name was successfully updated.' }
        format.json { render :show, status: :ok, location: @other_name }
      else
        format.html { render :edit }
        format.json { render json: @other_name.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /other_names/1
  # DELETE /other_names/1.json
  def destroy
    @other_name.destroy
    respond_to do |format|
      format.html { redirect_to other_names_url, notice: 'Other name was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_other_name
      @other_name = OtherName.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def other_name_params
      params.require(:other_name).permit(:name, :start_date, :end_date, :note)
    end
end
